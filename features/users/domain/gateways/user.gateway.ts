import { User } from "@/common/domain/users/entities";

export interface UserGateway {
    getRoleUser(userId: string): Promise<string>;
    getAllUsers(): Promise<User[]>;
    getUserById(userId: string): Promise<User | null>;
    updateUser(userId: string, { role, name }: { role?: string, name?: string }): Promise<void>;
}