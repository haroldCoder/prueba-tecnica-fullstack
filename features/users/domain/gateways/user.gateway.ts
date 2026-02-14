import { User } from "@/common/domain/users/entities";

export interface UserGateway {
    getRoleUser(userId: string): Promise<string>;
    getAllUsers(page?: number, pageSize?: number): Promise<{ users: User[], total: number }>;
    getUserById(userId: string): Promise<User | null>;
    updateUser(userId: string, { role, name }: { role?: string, name?: string }): Promise<void>;
}