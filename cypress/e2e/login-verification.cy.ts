// Correo y contraseña del usuario de prueba (creados por /api/testing/login)
const TEST_EMAIL = 'test-cypress@example.com'
const TEST_PASSWORD = 'Cypress@Test1234!'

describe('Verificación de Autenticación', () => {
    beforeEach(() => {
        // Limpiar estado antes de cada prueba
        cy.clearSession()

        // Aseguramos que el usuario de prueba existe en la DB con su contraseña
        // llamando al endpoint de testing
        cy.request('POST', '/api/testing/login').then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.ok).to.be.true
        })
    })

    it('debe permitir iniciar sesión manualmente con correo y contraseña', () => {
        // Usar el nuevo comando reutilizable que realiza todo el proceso por UI
        cy.loginUI(TEST_EMAIL, TEST_PASSWORD)

        // Verificaciones adicionales si son necesarias
        cy.get('body').should('not.contain', 'Inicia sesión para acceder')
        cy.log('✅ Login manual exitoso verificado')
    })

    it('debe mostrar error con credenciales inválidas', () => {
        cy.visit('/auth/login')

        cy.get('input#email').type(TEST_EMAIL)
        cy.get('input#password').type('password-erroneo')
        cy.get('button[type="submit"]').click()

        // El mensaje de error debe aparecer
        cy.get('body').should('contain.text', 'Invalid email or password', { timeout: 10000 })

        // La URL debe seguir siendo la de login
        cy.url().should('include', '/auth/login')
    })

    after(() => {
        cy.task('cleanupTestSessions')
    })
})
