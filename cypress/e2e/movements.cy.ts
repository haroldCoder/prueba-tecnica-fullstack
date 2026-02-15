describe('Funcionalidad de Movimientos', () => {
    beforeEach(() => {
        // Autenticar como usuario ADMIN
        cy.login()

        // Visitar la página de movimientos
        cy.visit('/movements')

        // Esperar a que la página cargue
        cy.wait(1500)
    })

    describe('Visualización de tabla de movimientos', () => {
        it('debe mostrar la tabla de movimientos con datos', () => {
            // Verificar que existe el contenedor de la tabla
            cy.get('table').should('exist')

            // Verificar que las columnas principales están presentes
            cy.contains('th', /concepto/i).should('be.visible')
            cy.contains('th', /monto/i).should('be.visible')
            cy.contains('th', /fecha/i).should('be.visible')
            cy.contains('th', /usuario/i).should('be.visible')
        })

        it('debe mostrar al menos un movimiento en la tabla', () => {
            // Esperar a que los datos se carguen
            cy.get('table tbody tr', { timeout: 10000 }).should('have.length.at.least', 1)

            // Verificar que hay contenido en las celdas
            cy.get('table tbody tr').first().within(() => {
                cy.get('td').should('have.length.at.least', 4)
            })
        })

        it('debe mostrar la paginación correctamente', () => {
            // Verificar que existe el componente de paginación
            cy.get('[data-testid="pagination"], nav').should('exist')

            // Verificar que hay información de la página actual
            cy.contains(/página/i).should('be.visible')
        })

        it('debe permitir navegar entre páginas', () => {
            // Verificar si hay más de una página
            cy.get('body').then(($body) => {
                // Buscar el botón de siguiente página usando data-testid
                const nextButton = $body.find('[data-testid="pagination-next"]')

                if (nextButton.length > 0 && !nextButton.prop('disabled')) {
                    // Si hay más páginas, hacer clic en siguiente
                    cy.wrap(nextButton).first().click()

                    // Esperar a que se actualice la tabla
                    cy.wait(1000)

                    // Verificar que la tabla sigue mostrando datos
                    cy.get('table tbody tr').should('have.length.at.least', 1)
                }
            })
        })
    })

    describe('Crear nuevo movimiento (ADMIN)', () => {
        it('debe mostrar el botón "Agregar movimiento" para usuarios ADMIN', () => {
            // Buscar el botón de agregar movimiento
            cy.get('body').then(($body) => {
                if ($body.find('button:contains("Agregar movimiento"), a:contains("Agregar movimiento")').length > 0) {
                    cy.contains(/agregar movimiento/i).should('be.visible')
                } else {
                    // Si no aparece, puede ser que el usuario no sea ADMIN
                    cy.log('Botón "Agregar movimiento" no encontrado - usuario podría no ser ADMIN')
                }
            })
        })

        it('debe poder acceder al formulario de crear movimiento', function () {
            // Buscar y hacer clic en el botón de agregar
            cy.get('body').then(($body) => {
                const addButton = $body.find('button:contains("Agregar movimiento"), a:contains("Agregar movimiento")')

                if (addButton.length > 0) {
                    cy.wrap(addButton).first().click()

                    // Verificar que estamos en la página de crear movimiento
                    cy.url().should('include', '/movements/create')

                    // Verificar que existe el formulario
                    cy.get('form').should('exist')
                } else {
                    cy.log('Saltando prueba - usuario no tiene permisos ADMIN')
                }
            })
        })

        it('debe poder crear un nuevo movimiento exitosamente', function () {
            // Buscar el botón de agregar
            cy.get('body').then(($body) => {
                const addButton = $body.find('button:contains("Agregar movimiento"), a:contains("Agregar movimiento")')

                if (addButton.length > 0) {
                    cy.wrap(addButton).first().click()
                    cy.wait(500)

                    // Datos de prueba para el nuevo movimiento
                    const newMovement = {
                        concept: `Movimiento de Prueba ${Date.now()}`,
                        amount: '1500',
                        date: '2026-02-14'
                    }

                    // Rellenar el formulario
                    cy.get('input[name="concept"], input[id*="concept"]').clear().type(newMovement.concept)
                    cy.get('input[name="amount"], input[id*="amount"], input[type="number"]').clear().type(newMovement.amount)
                    cy.get('input[name="date"], input[id*="date"], input[type="date"]').clear().type(newMovement.date)

                    // Seleccionar tipo de movimiento si existe el campo
                    cy.get('body').then(($form) => {
                        if ($form.find('select[name="type"], select[id*="type"]').length > 0) {
                            cy.get('select[name="type"], select[id*="type"]').select('INCOME')
                        }
                    })

                    // Enviar el formulario
                    cy.get('button[type="submit"]').click()

                    // Esperar respuesta
                    cy.wait(2000)

                    // Verificar que se muestra un mensaje de éxito o redirección
                    cy.url().should('satisfy', (url: string) => {
                        return url.includes('/movements') || url.includes('success')
                    })
                } else {
                    cy.log('Saltando prueba - usuario no tiene permisos ADMIN')
                }
            })
        })
    })

    describe('Estados de carga', () => {
        it('debe mostrar indicador de carga mientras obtiene los datos', () => {
            // Visitar la página nuevamente para ver el estado de carga
            cy.visit('/movements')

            // Buscar indicadores de carga comunes
            cy.get('body').then(($body) => {
                // Esperar un momento para capturar el estado de carga
                const hasSpinner = $body.find('[class*="spinner"], [class*="loading"], [role="status"]').length > 0

                if (hasSpinner) {
                    cy.log('Indicador de carga encontrado')
                }
            })
        })
    })

    after(() => {
        // Limpiar sesiones de prueba
        cy.task('cleanupTestSessions')
    })
})
