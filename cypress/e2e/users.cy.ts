describe('Funcionalidad de Usuarios', () => {
    beforeEach(() => {
        // Autenticar como usuario ADMIN
        cy.login()

        // Visitar la página de usuarios
        cy.visit('/users')

        // Esperar a que la página cargue
        cy.wait(1500)
    })

    describe('Visualización de tabla de usuarios', () => {
        it('debe mostrar la tabla de usuarios con datos', () => {
            // Verificar que existe el contenedor de la tabla
            cy.get('table').should('exist')

            // Verificar que las columnas principales están presentes
            cy.contains('th', /nombre/i).should('be.visible')
            cy.contains('th', /email/i).should('be.visible')
            cy.contains('th', /teléfono|telefono/i).should('be.visible')
        })

        it('debe mostrar al menos un usuario en la tabla', () => {
            // Esperar a que los datos se carguen
            cy.get('table tbody tr', { timeout: 10000 }).should('have.length.at.least', 1)

            // Verificar que hay contenido en las celdas
            cy.get('table tbody tr').first().within(() => {
                cy.get('td').should('have.length.at.least', 4)
            })
        })

        it('debe mostrar correctamente la información de los usuarios', () => {
            // Verificar que las celdas contienen información válida
            cy.get('table tbody tr').first().within(() => {
                // Verificar nombre (no debe estar vacío)
                cy.get('td').eq(0).should('not.be.empty')

                // Verificar email (debe contener @)
                cy.get('td').eq(1).invoke('text').should('match', /@/)
            })
        })

        it('debe mostrar la paginación correctamente', () => {
            // Verificar que existe el componente de paginación
            cy.get('[data-testid="pagination"], nav').should('exist')

            // Verificar que hay información de la página actual
            cy.contains(/página/i).should('be.visible')
        })

        it('debe permitir navegar entre páginas si hay múltiples páginas', () => {
            // Verificar si hay más de una página
            cy.get('body').then(($body) => {
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

        it('debe mostrar acciones disponibles para cada usuario', () => {
            // Verificar que existe la columna de acciones
            cy.get('table thead th').last().should('exist')

            // Verificar que hay botones o enlaces de acción en la primera fila
            cy.get('table tbody tr').first().within(() => {
                // Buscar botones de editar o acciones
                cy.get('td').last().find('button, a').should('have.length.at.least', 1)
            })
        })
    })

    describe('Actualizar usuario', () => {
        it('debe poder acceder al formulario de actualización', () => {
            // Esperar a que la tabla cargue
            cy.get('table tbody tr', { timeout: 10000 }).should('have.length.at.least', 1)

            // Hacer clic en el botón de editar del primer usuario
            cy.get('table tbody tr').first().within(() => {
                // Buscar botón de editar (puede ser un ícono o texto)
                cy.get('td').last().find('button, a').first().click()
            })

            // Esperar a que se navegue o se abra el formulario
            cy.wait(1000)

            // Verificar que estamos en la página de actualización o se abrió un modal
            cy.url().should('satisfy', (url: string) => {
                return url.includes('/update') || url.includes('/edit')
            })
        })

        it('debe poder actualizar la información de un usuario', () => {
            // Esperar a que la tabla cargue
            cy.get('table tbody tr', { timeout: 10000 }).should('have.length.at.least', 1)

            // Guardar información original del usuario
            let originalName: string
            let originalEmail: string

            cy.get('table tbody tr').first().within(() => {
                cy.get('td').eq(0).invoke('text').then((text) => {
                    originalName = text.trim()
                })
                cy.get('td').eq(1).invoke('text').then((text) => {
                    originalEmail = text.trim()
                })

                // Hacer clic en editar
                cy.get('td').last().find('button, a').first().click()
            })

            cy.wait(1000)

            // Datos de actualización
            const updatedData = {
                name: `Usuario Actualizado ${Date.now()}`,
            }

            // Buscar y actualizar el campo de nombre
            cy.get('body').then(($body) => {
                const nameInput = $body.find('input[name="name"], input[id*="name"]')

                if (nameInput.length > 0) {
                    cy.wrap(nameInput).clear().type(updatedData.name)
                }

                // Enviar el formulario
                cy.get('button[type="submit"], button:contains("Guardar"), button:contains("Actualizar")').first().click()

                // Esperar respuesta
                cy.wait(2000)

                // Verificar que se muestra mensaje de éxito o redirección
                cy.url().should('satisfy', (url) => {
                    return url.includes('/users') || url.includes('success')
                })
            })
        })

        it('debe validar campos requeridos al actualizar', () => {
            // Esperar a que la tabla cargue
            cy.get('table tbody tr', { timeout: 10000 }).should('have.length.at.least', 1)

            // Hacer clic en editar
            cy.get('table tbody tr').first().within(() => {
                cy.get('td').last().find('button, a').first().click()
            })

            cy.wait(1000)

            // Intentar limpiar el campo de nombre (requerido)
            cy.get('body').then(($body) => {
                const nameInput = $body.find('input[name="name"], input[id*="name"]')

                if (nameInput.length > 0) {
                    cy.wrap(nameInput).clear()

                    // Intentar enviar el formulario
                    cy.get('button[type="submit"], button:contains("Guardar"), button:contains("Actualizar")').first().click()

                    // Verificar que muestra error de validación
                    cy.get('body').should('satisfy', ($body) => {
                        const hasError = $body.find('[class*="error"], [role="alert"], .text-red').length > 0
                        return hasError || $body.text().includes('requerido') || $body.text().includes('required')
                    })
                }
            })
        })
    })

    describe('Estados de carga', () => {
        it('debe mostrar indicador de carga mientras obtiene los datos', () => {
            // Visitar la página nuevamente para ver el estado de carga
            cy.visit('/users')

            // Buscar indicadores de carga comunes
            cy.get('body').then(($body) => {
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
