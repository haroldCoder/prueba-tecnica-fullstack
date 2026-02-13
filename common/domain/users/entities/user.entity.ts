export type UserRole = 'ADMIN' | 'USER';

export const UserRoleEnum = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    emailVerified: boolean;
    image?: string | null;
    role?: UserRole | null;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | null;
    createdAt: Date;
    updatedAt: Date;
};