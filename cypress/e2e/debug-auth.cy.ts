/// <reference types="cypress" />

/**
 * Prueba de depuración para verificar el funcionamiento de la autenticación
 */

describe('DEBUG: Autenticación', () => {
    it('debe mostrar todas las cookies después del login', () => {
        cy.clearSession()

        cy.log('🔍 Antes del login')
        cy.getAllCookies().then((cookies) => {
            cy.log('Cookies antes del login:', cookies)
        })

        cy.login()

        cy.log('🔍 Después del login')
        cy.getAllCookies().then((cookies) => {
            cy.log('Cookies después del login:', cookies)
            cookies.forEach(cookie => {
                cy.log(`Cookie: ${cookie.name} = ${cookie.value.substring(0, 20)}...`)
            })
        })

        cy.getCookie('better-auth.session_token').then((cookie) => {
            if (cookie) {
                cy.log('✅ Cookie de sesión encontrada:', cookie.value.substring(0, 20) + '...')
            } else {
                cy.log('❌ Cookie de sesión NO encontrada')
            }
        })

        cy.visit('/', {
            onBeforeLoad: (win) => {
                console.log('🔍 Cookies en el navegador:', win.document.cookie)
            }
        })

        cy.url().then((url) => {
            cy.log('URL actual:', url)
        })

        // Esperar un poco para ver qué pasa
        cy.wait(2000)
    })

    it('debe verificar la sesión en el backend', () => {
        cy.clearSession()
        cy.login()

        // Hacer una petición al backend para verificar la sesión
        cy.request({
            method: 'GET',
            url: '/api/auth/session',
            failOnStatusCode: false,
        }).then((response) => {
            cy.log('Respuesta del backend:', response.status)
            cy.log('Body:', response.body)
        })
    })

    it('debe verificar qué cookies espera Better Auth', () => {
        cy.clearSession()

        // Visitar la página de login para ver qué cookies establece Better Auth
        cy.visit('/auth/login')

        cy.getAllCookies().then((cookies) => {
            cy.log('Cookies en /auth/login:', cookies)
        })
    })
})
