import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation - Prueba Técnica Fullstack',
            version: '1.0.0',
            description: 'Documentación completa de la API REST del proyecto',
            contact: {
                name: 'API Support',
                email: 'support@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo',
            },
            {
                url: 'https://api.production.com',
                description: 'Servidor de producción',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                CookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'better-auth.session_token',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único del usuario',
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre del usuario',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email del usuario',
                        },
                        emailVerified: {
                            type: 'boolean',
                            description: 'Indica si el email está verificado',
                        },
                        image: {
                            type: 'string',
                            nullable: true,
                            description: 'URL de la imagen de perfil',
                        },
                        role: {
                            type: 'string',
                            enum: ['ADMIN', 'USER'],
                            nullable: true,
                            description: 'Rol del usuario',
                        },
                        banned: {
                            type: 'boolean',
                            nullable: true,
                            description: 'Indica si el usuario está baneado',
                        },
                        banReason: {
                            type: 'string',
                            nullable: true,
                            description: 'Razón del baneo',
                        },
                        banExpires: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                            description: 'Fecha de expiración del baneo',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de creación',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de última actualización',
                        },
                    },
                },
                Movement: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único del movimiento',
                        },
                        userId: {
                            type: 'string',
                            description: 'ID del usuario que creó el movimiento',
                        },
                        type: {
                            type: 'string',
                            enum: ['INCOME', 'EXPENSE'],
                            description: 'Tipo de movimiento',
                        },
                        amount: {
                            type: 'number',
                            description: 'Monto del movimiento',
                        },
                        concept: {
                            type: 'string',
                            description: 'Concepto o descripción del movimiento',
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha del movimiento',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de creación',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de última actualización',
                        },
                    },
                },
                CreateMovementInput: {
                    type: 'object',
                    required: ['type', 'amount', 'concept'],
                    properties: {
                        type: {
                            type: 'string',
                            enum: ['INCOME', 'EXPENSE'],
                            description: 'Tipo de movimiento',
                        },
                        amount: {
                            type: 'number',
                            description: 'Monto del movimiento',
                        },
                        concept: {
                            type: 'string',
                            description: 'Concepto o descripción del movimiento',
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha del movimiento (opcional)',
                        },
                    },
                },
                ChartMovementsResponse: {
                    type: 'object',
                    properties: {
                        labels: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Etiquetas del gráfico (ej: meses)',
                        },
                        income: {
                            type: 'array',
                            items: {
                                type: 'number',
                            },
                            description: 'Valores de ingresos por período',
                        },
                        expense: {
                            type: 'array',
                            items: {
                                type: 'number',
                            },
                            description: 'Valores de egresos por período',
                        },
                    },
                },
                Report: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único del reporte',
                        },
                        totalIncome: {
                            type: 'number',
                            description: 'Total de ingresos',
                        },
                        totalExpense: {
                            type: 'number',
                            description: 'Total de egresos',
                        },
                        balance: {
                            type: 'number',
                            description: 'Balance (ingresos - egresos)',
                        },
                        generatedBy: {
                            type: 'string',
                            description: 'ID del usuario que generó el reporte',
                        },
                        generatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de generación del reporte',
                        },
                    },
                },
                Balance: {
                    type: 'object',
                    properties: {
                        balance: {
                            type: 'number',
                            description: 'Balance total (ingresos - egresos)',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Mensaje de error',
                        },
                        message: {
                            type: 'string',
                            description: 'Descripción detallada del error',
                        },
                    },
                },
            },
        },
        security: [
            {
                CookieAuth: [],
            },
        ],
    },
    apis: ['./pages/api/**/*.ts'], // Ruta a tus archivos de API
};

export const swaggerSpec = swaggerJsdoc(options);
