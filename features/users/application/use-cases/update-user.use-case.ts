import { UserGateway } from "@/features/users/domain/gateways/user.gateway";

export class UpdateUserUseCase {
    constructor(private readonly userGateway: UserGateway) { }

    async execute(userId: string, { role, name }: { role?: string, name?: string }): Promise<void> {
        return this.userGateway.updateUser(userId, { role, name });
    }
}
