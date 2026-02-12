import { UserGateway } from "@/features/users/domain/gateways";
import { User } from "@/common/domain/users/entities";
import { prisma } from "@/common/infrastructure/database/prisma.client";
import { UserMapper } from "@/features/users/infrastructure/mappers";

export class PrismaUserGateway implements UserGateway {
    async getRoleUser(userId: string): Promise<string> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return user?.role || 'USER';
    }

    async getAllUsers(): Promise<User[]> {
        const users = await prisma.user.findMany()
        return users.map(UserMapper.toDomain);
    }

    async updateUser(userId: string, { role, name }: { role?: string, name?: string }): Promise<void> {
        await prisma.user.update({ where: { id: userId }, data: { role, name } });
    }
}