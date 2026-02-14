import { UserGateway } from "@/features/users/domain/gateways";
import { User } from "@/common/domain/users/entities";
import { prisma } from "@/common/infrastructure/database/prisma.client";
import { UserMapper } from "@/features/users/infrastructure/mappers";

export class PrismaUserGateway implements UserGateway {
    async getRoleUser(userId: string): Promise<string> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return user?.role || 'USER';
    }

    async getAllUsers(page: number = 1, pageSize: number = 10): Promise<{ users: User[], total: number }> {
        const skip = (page - 1) * pageSize;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: pageSize,
            }),
            prisma.user.count(),
        ]);

        return {
            users: users.map(UserMapper.toDomain),
            total,
        };
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return user ? UserMapper.toDomain(user) : null;
    }

    async updateUser(userId: string, { role, name }: { role?: string, name?: string }): Promise<void> {
        await prisma.user.update({ where: { id: userId }, data: { role, name } });
    }
}