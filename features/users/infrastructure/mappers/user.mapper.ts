import { Prisma } from "@prisma/client";
import { User } from "@/common/domain/users/entities/user.entity";
import { UserRole } from "@/common/domain/users/entities/user.entity";

export const UserMapper = {
    toDomain(raw: Prisma.UserGetPayload<{}>): User {
        return {
            id: raw.id,
            name: raw.name,
            email: raw.email,
            emailVerified: raw.emailVerified,
            image: raw.image,
            role: raw.role as UserRole | null,
            banned: raw.banned,
            banReason: raw.banReason,
            banExpires: raw.banExpires,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        };
    },
};