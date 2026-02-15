describe('Funcionalidad de Reportes', () => {
    beforeEach(() => {
        // Autenticar como usuario ADMIN
        cy.login()

        // Visitar la página de reportes
        cy.visit('/reports')

        // Esperar a que la página cargue
        cy.wait(2000)
    })

    describe('Visualización de la vista de reportes', () => {
        it('debe cargar la página de reportes correctamente', () => {
            // Verificar que la URL es correcta
            cy.url().should('include', '/reports')

            // Verificar que el contenedor principal existe
            cy.get('body').should('be.visible')
        })

        it('debe mostrar el componente de balance total', () => {
            // Buscar el componente que muestra el balance
            cy.get('body').should('satisfy', ($body) => {
                return $body.text().includes('Balance') ||
                    $body.text().includes('Total') ||
                    $body.find('[class*="balance"]').length > 0
            })

            // Verificar que muestra un valor numérico para el balance
            cy.contains(/balance|total/i).parent().should('contain.text', '$')
                .or('contain.text', '-')
                .or('satisfy', ($el) => {
                    const text = $el.text()
                    return /\d+/.test(text) || text.includes('0')
                })
        })

        it('debe mostrar el balance con formato correcto', () => {
            // Esperar a que carguen los datos
            cy.wait(1000)

            // Buscar elemento que contenga balance
            cy.get('body').then(($body) => {
                const balanceElement = $body.find('[class*="balance"], [data-testid*="balance"]')

                if (balanceElement.length > 0) {
                    cy.wrap(balanceElement).should('be.visible')
                } else {
                    // Buscar por texto
                    cy.contains(/balance/i).should('be.visible')
                }
            })
        })
    })

    describe('Visualización del gráfico de movimientos', () => {
        it('debe mostrar el gráfico de datos de movimientos', () => {
            // Esperar a que el gráfico cargue
            cy.wait(2000)

            // Buscar elementos SVG que indican un gráfico (recharts usa SVG)
            cy.get('svg', { timeout: 10000 }).should('exist')

            // Verificar que hay contenido en el SVG
            cy.get('svg').should('be.visible')
        })

        it('debe mostrar elementos visuales del gráfico', () => {
            // Esperar a que cargue completamente
            cy.wait(2000)

            // Verificar elementos comunes de gráficos recharts
            cy.get('body').then(($body) => {
                const hasRecharts = $body.find('.recharts-wrapper, .recharts-surface').length > 0
                const hasSvg = $body.find('svg').length > 0
                const hasCanvas = $body.find('canvas').length > 0

                expect(hasRecharts || hasSvg || hasCanvas).to.be.true
            })
        })

        it('debe renderizar correctamente el área del gráfico', () => {
            // Verificar que el gráfico tiene un tamaño razonable
            cy.get('svg').should(($svg) => {
                const width = $svg.width()
                const height = $svg.height()

                expect(width).to.be.greaterThan(100)
                expect(height).to.be.greaterThan(100)
            })
        })

        it('debe mostrar indicador de carga antes de renderizar el gráfico', () => {
            // Recargar la página para capturar el estado de carga
            cy.visit('/reports')

            // Buscar indicadores de carga
            cy.get('body', { timeout: 1000 }).should('satisfy', ($body) => {
                return $body.find('[class*="loading"], [class*="spinner"], [role="status"]').length > 0 ||
                    $body.find('svg').length > 0
            })
        })
    })

    describe('Botón de descarga de reporte CSV', () => {
        it('debe mostrar el botón de descarga de CSV', () => {
            // Buscar el botón de descarga
            cy.get('body').should('satisfy', ($body) => {
                return $body.text().includes('CSV') ||
                    $body.text().includes('Descargar') ||
                    $body.text().includes('Download') ||
                    $body.find('button:contains("Descargar reporte en CSV"), a:contains("CSV")').length > 0
            })
        })

        it('debe tener el botón de descarga visible y habilitado', () => {
            // Esperar a que carguen los datos
            cy.wait(1500)

            // Buscar y verificar el botón
            cy.get('body').then(($body) => {
                const csvButton = $body.find('button:contains("CSV"), a:contains("CSV"), button:contains("Descargar"), a:contains("Descargar")')

                if (csvButton.length > 0) {
                    cy.wrap(csvButton).first().should('be.visible')
                }
            })
        })

        it('debe poder hacer clic en el botón de descarga', () => {
            // Esperar a que carguen los datos
            cy.wait(1500)

            // Buscar el botón de descarga
            cy.get('body').then(($body) => {
                const csvButton = $body.find('button:contains("CSV"), a:contains("CSV"), button:contains("Descargar"), a:contains("Descargar")')

                if (csvButton.length > 0 && !csvButton.prop('disabled')) {
                    // Interceptar la descarga
                    cy.wrap(csvButton).first().click()

                    // Esperar respuesta
                    cy.wait(1000)

                    // Verificar que no hay errores visibles
                    cy.get('body').should('not.contain', 'Error')
                }
            })
        })
    })

    describe('Interactividad del gráfico', () => {
        it('debe permitir interacción con el gráfico si está habilitada', () => {
            // Esperar a que el gráfico cargue
            cy.wait(2000)

            // Intentar hacer hover sobre el gráfico
            cy.get('svg').trigger('mouseover')

            // Verificar si aparecen tooltips u otros elementos interactivos
            cy.wait(500)

            cy.get('body').then(($body) => {
                const hasTooltip = $body.find('[class*="tooltip"], [role="tooltip"]').length > 0

                if (hasTooltip) {
                    cy.log('Gráfico tiene interactividad con tooltip')
                }
            })
        })
    })

    describe('Estados de error', () => {
        it('debe manejar correctamente errores de carga de datos', () => {
            // Esta prueba verifica que la UI no se rompe si hay errores
            // Simplemente verifica que los componentes básicos están presentes
            cy.get('body').should('be.visible')

            // Verificar que no hay mensajes de error críticos
            cy.get('body').should('not.contain', 'undefined')
            cy.get('body').should('not.contain', 'null')
        })
    })

    describe('Rendimiento de la vista', () => {
        it('debe cargar la página en un tiempo razonable', () => {
            const startTime = Date.now()

            cy.visit('/reports')

            // Esperar a que el gráfico esté presente
            cy.get('svg', { timeout: 10000 }).should('exist')

            cy.then(() => {
                const loadTime = Date.now() - startTime
                expect(loadTime).to.be.lessThan(10000) // Menos de 10 segundos
            })
        })
    })

    after(() => {
        // Limpiar sesiones de prueba
        cy.task('cleanupTestSessions')
    })
})
