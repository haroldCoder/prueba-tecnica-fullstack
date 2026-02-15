// ***********************************************
// Custom commands for Cypress
// ***********************************************

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to simulate login
             * @example cy.login()
             */
            login(): Chainable<void>

            /**
             * Custom command to clear session
             * @example cy.clearSession()
             */
            clearSession(): Chainable<void>
        }
    }
}

/**
 * Simula un login para las pruebas E2E
 * Crea un usuario de prueba en la base de datos e intercepta las peticiones
 * de Better Auth para devolver una sesión válida
 */
Cypress.Commands.add('login', () => {
    cy.task('createTestSession').then((session: any) => {
        if (!session || !session.token) {
            throw new Error('No se pudo crear la sesión de prueba')
        }

        // Interceptar todas las peticiones a /api/auth/session
        // y devolver una sesión válida
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

        // Guardar información del usuario para uso en las pruebas
        cy.wrap(session.user).as('testUser')

        // Establecer la cookie ANTES de visitar la página para evitar redirecciones
        cy.setCookie('better-auth.session_token', session.token)

        cy.log('✅ Login simulado exitosamente', session.user.email)

        // Visitar la página principal
        cy.visit('/', {
            onBeforeLoad: (win: Cypress.AUTWindow) => {
                // Asegurar que la cookie esté presente en document.cookie antes de que cargue la app
                // Esto ayuda con la hidratación inicial y verificaciones del lado del cliente
                win.document.cookie = `better-auth.session_token=${session.token}; path=/; SameSite=Lax`

                // Forzar a Better Auth a reconocer la sesión
                win.localStorage.setItem('better-auth.session_token', session.token)

                // Disparar evento de storage para que Better Auth detecte el cambio
                win.dispatchEvent(new StorageEvent('storage', {
                    key: 'better-auth.session_token',
                    newValue: session.token,
                    storageArea: win.localStorage
                }))
            }
        })

        // Esperar a que la página cargue completamente
        cy.wait(1000)
    })
})

/**
 * Limpia la sesión y cookies
 */
Cypress.Commands.add('clearSession', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
})

export { }
