import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: true,
        screenshotOnRunFailure: true,
        async setupNodeEvents(on, config) {
            on('task', {
                async createTestSession() {
                    const { PrismaClient } = await import('@prisma/client')
                    const crypto = await import('crypto')
                    const prisma = new PrismaClient()

                    try {
                        // 1. Crear o obtener usuario de pruebas
                        const userEmail = 'test-cypress@example.com'
                        const userId = 'user-test-cypress'

                        const user = await prisma.user.upsert({
                            where: { email: userEmail },
                            update: {
                                name: 'Cypress Test User',
                                emailVerified: true,
                                role: 'ADMIN',
                            },
                            create: {
                                id: userId,
                                name: 'Cypress Test User',
                                email: userEmail,
                                emailVerified: true,
                                role: 'ADMIN',
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            },
                        })

                        // 2. Crear o actualizar Account para simular login con GitHub
                        // Better Auth usa esta tabla para proveedores OAuth
                        await prisma.account.upsert({
                            where: {
                                id: `account-github-${userId}`,
                            },
                            update: {
                                updatedAt: new Date(),
                            },
                            create: {
                                id: `account-github-${userId}`,
                                accountId: 'cypress-github-account',
                                providerId: 'github',
                                userId: user.id,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            },
                        })

                        // 3. Limpiar sesiones antiguas del usuario de prueba
                        await prisma.session.deleteMany({
                            where: { userId: user.id },
                        })

                        // 3. Generar un token seguro similar a como lo hace Better Auth
                        // Better Auth usa tokens aleatorios de 32 bytes en formato hexadecimal
                        const token = crypto.randomBytes(32).toString('hex')
                        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días

                        // 4. Crear sesión en la base de datos
                        const session = await prisma.session.create({
                            data: {
                                id: crypto.randomUUID(),
                                userId: user.id,
                                token,
                                expiresAt,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                userAgent: 'Cypress/E2E-Test',
                                ipAddress: '127.0.0.1',
                            },
                        })

                        console.log('✅ Sesión de prueba creada:', {
                            userId: user.id,
                            email: user.email,
                            sessionId: session.id,
                        })

                        return {
                            token: session.token,
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                            },
                        }
                    } catch (error) {
                        console.error('❌ Error creating test session:', error)
                        throw error
                    } finally {
                        await prisma.$disconnect()
                    }
                },

                async cleanupTestSessions() {
                    const { PrismaClient } = await import('@prisma/client')
                    const prisma = new PrismaClient()

                    try {
                        // Limpiar todas las sesiones del usuario de prueba
                        const deleted = await prisma.session.deleteMany({
                            where: {
                                user: {
                                    email: 'test-cypress@example.com',
                                },
                            },
                        })

                        console.log(`🧹 Limpiadas ${deleted.count} sesiones de prueba`)
                        return null
                    } catch (error) {
                        console.error('Error cleaning up test sessions:', error)
                        return null
                    } finally {
                        await prisma.$disconnect()
                    }
                },
            })
        },
    },
    env: {
        // Variables de entorno para las pruebas
    },
})
