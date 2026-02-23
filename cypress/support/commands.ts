// ***********************************************
// Custom commands for Cypress
// ***********************************************

declare global {
    namespace Cypress {
        interface Chainable {
            loginUI(email?: string, password?: string): Chainable<void>
            clearSession(): Chainable<void>
        }
    }
}

Cypress.Commands.add('loginUI', (email, password) => {
    const userEmail = email || 'test-cypress@example.com';
    const userPassword = password || 'Cypress@Test1234!';

    // Aseguramos que el usuario de prueba existe en la DB con su contraseña
    // llamando al endpoint de testing (esto es necesario para que el login de Better Auth funcione)
    cy.request({
        method: 'POST',
        url: '/api/testing/login',
        failOnStatusCode: true,
    }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.ok).to.be.true;

        // Visitar la página de login
        cy.visit('/auth/login');

        // Verificar y rellenar el formulario
        cy.get('input#email').should('be.visible').type(userEmail);
        cy.get('input#password').should('be.visible').type(userPassword);

        // Hacer clic en el botón de iniciar sesión
        cy.get('button[type="submit"]').click();

        // Esperar a que la redirección ocurra (indicando login exitoso)
        cy.url().should('not.include', '/auth/login', { timeout: 10000 });

        // Verificar que la cookie de sesión existe
        cy.getCookie('better-auth.session_token').should('exist');

        cy.log('✅ Login UI exitoso como', userEmail);
    });
});

/**
 * Limpia la sesión y cookies
 */
Cypress.Commands.add('clearSession', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
})

export { }
