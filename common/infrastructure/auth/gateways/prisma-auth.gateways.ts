import { AuthGateway } from "@/common/domain/auth/gateways/auth.gateways";
import { prisma } from "@/common/infrastructure/database/prisma.client";
import crypto from 'crypto'
import { ResponsePrismaLoginDto } from "@/common/infrastructure/auth/dto";

export class PrismaAuthGateway implements AuthGateway {
    async loginTest(email: string, password: string, userId: string): Promise<ResponsePrismaLoginDto> {
        const { hashPassword } = await import('better-auth/crypto')

        const user = await prisma.user.upsert({
            where: { email: email },
            update: {
                name: 'Cypress Test User',
                emailVerified: true,
                role: 'ADMIN',
            },
            create: {
                id: userId,
                name: 'Cypress Test User',
                email: email,
                emailVerified: true,
                role: 'ADMIN',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })

        const hashedPassword = await hashPassword(password)

        await prisma.session.deleteMany({ where: { userId: user.id } })

        const account = await prisma.account.upsert({
            where: { id: `account-credential-${user.id}` },
            update: {
                password: hashedPassword,
                updatedAt: new Date(),
            },
            create: {
                id: `account-credential-${user.id}`,
                accountId: user.id,
                providerId: 'credential',
                userId: user.id,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })

        const token = crypto.randomBytes(32).toString('hex')
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días

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

        const cookieExpires = expiresAt.toUTCString()

        return {
            token,
            cookieExpires,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role as string,
            }
        }
    }
}