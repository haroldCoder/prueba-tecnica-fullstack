import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const options = {
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
                url: 'https://prueba-tecnica-fullstack-beige.vercel.app',
                description: 'Production Server',
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
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        emailVerified: { type: 'boolean' },
                        image: { type: 'string', nullable: true },
                        role: { type: 'string', enum: ['ADMIN', 'USER'], nullable: true },
                        banned: { type: 'boolean', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                // Repetir los esquemas básicos aquí para que el script sea independiente
                // O intentar importar el config, pero importar TS en MJS requiere loaders
                // Para mantenerlo simple y robusto en Vercel, duplicamos la configuración base
                // o creamos un JSON común.
                Movement: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        userId: { type: 'string' },
                        type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
                        amount: { type: 'number' },
                        concept: { type: 'string' },
                        date: { type: 'string', format: 'date-time' },
                    }
                }
            },
        },
    },
    apis: [
        path.join(rootDir, 'pages/api/**/*.ts'),
        path.join(rootDir, 'pages/api/**/*.js'),
        path.join(rootDir, 'features/**/infrastructure/api/**/*.ts')
    ],
};

console.log('Generating Swagger spec...');
const spec = swaggerJsdoc(options);

const outputPath = path.join(rootDir, 'public', 'swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));
console.log(`Swagger spec generated at ${outputPath}`);
