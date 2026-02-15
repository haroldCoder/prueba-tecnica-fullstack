/// <reference types="cypress" />

/**
 * Prueba simple para verificar el endpoint de sesión
 */

describe('DEBUG: Verificar endpoint de sesión', () => {
    it('debe verificar qué devuelve /api/auth/session sin autenticación', () => {
        cy.request({
            method: 'GET',
            url: '/api/auth/session',
            failOnStatusCode: false,
        }).then((response) => {
            cy.log('Status:', response.status)
            cy.log('Body:', JSON.stringify(response.body, null, 2))
        })
    })

    it('debe verificar qué devuelve /api/auth/session con cookie', () => {
        cy.visit('/')

        cy.task('createTestSession').then((session: any) => {
            cy.setCookie('better-auth.session_token', session.token)

            cy.request({
                method: 'GET',
                url: '/api/auth/session',
                failOnStatusCode: false,
            }).then((response) => {
                cy.log('Status con cookie:', response.status)
                cy.log('Body con cookie:', JSON.stringify(response.body, null, 2))
                cy.log('Token usado:', session.token.substring(0, 20) + '...')
            })
        })
    })

    it('debe verificar la sesión en la base de datos', () => {
        cy.task('createTestSession').then((session: any) => {
            cy.log('Sesión creada:', JSON.stringify(session, null, 2))

            // Verificar que el token tiene el formato correcto
            cy.wrap(session.token).should('have.length.greaterThan', 32)
        })
    })
})
