/// <reference types="cypress" />

/**
 * Ejemplo de prueba E2E completa usando autenticación simulada
 * Este archivo demuestra las mejores prácticas para usar cy.login()
 */

describe('Ejemplo: Pruebas con Autenticación', () => {
    beforeEach(() => {
        // Limpiar el estado antes de cada prueba
        cy.clearSession()
    })

    describe('Flujo de Autenticación', () => {
        it('debe autenticar correctamente al usuario de prueba', () => {
            // Hacer login
            cy.login()

            // Visitar la página principal
            cy.visit('/')

            // Verificar que la cookie de sesión existe
            cy.getCookie('better-auth.session_token').should('exist')

            // Verificar que tenemos acceso a los datos del usuario
            cy.get('@testUser').then((user: any) => {
                expect(user.email).to.equal('test-cypress@example.com')
                expect(user.role).to.equal('ADMIN')
                cy.log('Usuario autenticado:', user.email)
            })
        })

        it('debe mantener la sesión entre navegaciones', () => {
            cy.login()
            cy.visit('/')

            // Navegar a otra página
            cy.visit('/dashboard')

            // La cookie debe seguir existiendo
            cy.getCookie('better-auth.session_token').should('exist')
        })

        it('debe poder cerrar sesión correctamente', () => {
            cy.login()
            cy.visit('/')

            // Verificar que estamos autenticados
            cy.getCookie('better-auth.session_token').should('exist')

            // Cerrar sesión
            cy.clearSession()

            // Verificar que la sesión se eliminó
            cy.getCookie('better-auth.session_token').should('not.exist')
        })
    })

    describe('Acceso a Recursos Protegidos', () => {
        beforeEach(() => {
            // Todas estas pruebas requieren autenticación
            cy.login()
        })

        it('debe permitir acceso al dashboard', () => {
            cy.visit('/dashboard')
            cy.url().should('include', '/dashboard')
        })

        it('debe permitir crear un movimiento', () => {
            cy.visit('/dashboard')

            // Ejemplo: buscar el botón para crear movimiento
            // Ajusta los selectores según tu UI real
            cy.get('[data-testid="new-movement"]').should('exist')
        })

        it('debe mostrar la lista de usuarios (solo ADMIN)', () => {
            cy.visit('/users')

            // Verificar que el usuario tiene rol ADMIN
            cy.get('@testUser').then((user: any) => {
                expect(user.role).to.equal('ADMIN')
            })

            // Verificar que podemos ver la tabla de usuarios
            cy.get('[data-testid="users-table"]').should('exist')
        })
    })

    describe('Manejo de Datos del Usuario', () => {
        it('debe usar la información del usuario en las pruebas', () => {
            cy.login()

            cy.get('@testUser').then((user: any) => {
                // Puedes usar la información del usuario en tus pruebas
                cy.log('ID del usuario:', user.id)
                cy.log('Email:', user.email)
                cy.log('Nombre:', user.name)
                cy.log('Rol:', user.role)

                // Ejemplo: verificar que el nombre aparece en la UI
                cy.visit('/')
                cy.contains(user.name).should('be.visible')
            })
        })
    })

    // Limpiar todas las sesiones de prueba al finalizar
    after(() => {
        cy.task('cleanupTestSessions')
    })
})
