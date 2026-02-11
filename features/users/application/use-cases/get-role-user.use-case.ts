import { UserGateway } from "@/features/users/domain/gateways/user.gateway";

export class GetRoleUserUseCase {
    constructor(private readonly userGateway: UserGateway) { }

    async execute(userId: string): Promise<string> {
        return this.userGateway.getRoleUser(userId);
    }
}