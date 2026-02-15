describe('Verificación de Autenticación Simulada', () => {
    beforeEach(() => {
        // Limpiar estado antes de cada prueba
        cy.clearSession()
    })

    it('debe autenticar exitosamente usando sesión simulada', () => {
        // Ejecutar el comando de login personalizado
        // cy.login() ahora visita '/' automáticamente y recarga la página
        cy.login()

        // Verificar que la cookie de sesión existe
        cy.getCookie('better-auth.session_token').should('exist')
        cy.getCookie('better-auth.session_token').should('have.property', 'value')

        // Verificar que NO se muestra el botón de Sign In (indica que estamos autenticados)
        cy.get('body').should('not.contain', 'Sign In')

        // Verificar que podemos acceder a la información del usuario de prueba
        cy.get('@testUser').should('exist').then((user: any) => {
            expect(user).to.have.property('email', 'test-cypress@example.com')
            expect(user).to.have.property('role', 'ADMIN')
        })
    })

    it('debe poder navegar a páginas protegidas después del login', () => {
        cy.login()

        // Intentar acceder a una página que requiere autenticación
        cy.visit('/')

        // Verificar que no somos redirigidos al login
        cy.url().should('include', '/')
    })

    after(() => {
        // Limpiar sesiones de prueba al finalizar
        cy.task('cleanupTestSessions')
    })
})
