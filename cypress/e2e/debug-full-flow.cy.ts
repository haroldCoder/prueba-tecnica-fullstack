describe('Depuración completa del flujo de autenticación', () => {
    it('debe mostrar todo el flujo de login', () => {
        // Crear sesión
        cy.task('createTestSession').then((session: any) => {
            cy.log('📝 Sesión creada:', session.user.email)

            // Interceptar TODAS las peticiones a /api/auth/*
            cy.intercept('/api/auth/**', (req) => {
                cy.log(`🔍 Petición interceptada: ${req.method} ${req.url}`)
                cy.log('Headers:', JSON.stringify(req.headers))
                cy.log('Cookies:', JSON.stringify(req.headers.cookie))
            }).as('authRequests')

            // Interceptar específicamente /api/auth/session
            cy.intercept('GET', '/api/auth/session', {
                statusCode: 200,
                body: {
                    user: session.user,
                    session: {
                        id: `session-${Date.now()}`,
                        userId: session.user.id,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                        token: session.token,
                        ipAddress: '127.0.0.1',
                        userAgent: 'Cypress/E2E-Test',
                    },
                },
            }).as('sessionRequest')

            // Establecer cookie ANTES de visitar
            cy.setCookie('better-auth.session_token', session.token, {
                path: '/',
                httpOnly: false,
                secure: false,
                sameSite: 'lax'
            })

            // Verificar que la cookie se estableció
            cy.getCookie('better-auth.session_token').then((cookie) => {
                cy.log('🍪 Cookie establecida:', cookie)
            })

            // Visitar la página principal
            cy.log('🌐 Visitando /')
            cy.visit('/')

            // Esperar un momento
            cy.wait(2000)

            // Ver qué URL estamos
            cy.url().then((url) => {
                cy.log('📍 URL actual:', url)
            })

            // Ver si hay cookies
            cy.getCookie('better-auth.session_token').then((cookie) => {
                cy.log('🍪 Cookie después de visitar:', cookie)
            })

            // Intentar ver el estado de la ventana
            cy.window().then((win) => {
                cy.log('🪟 Window location:', win.location.href)
                cy.log('🪟 Window localStorage:', JSON.stringify(win.localStorage))
            })
        })
    })
})
