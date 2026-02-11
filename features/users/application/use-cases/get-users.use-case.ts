import { UserGateway } from "@/features/users/domain/gateways/user.gateway";
import { User } from "@/features/users/domain/entities/user.entity";

export class GetUsersUseCase {
    constructor(private readonly userGateway: UserGateway) { }

    async execute(): Promise<User[]> {
        return this.userGateway.getAllUsers();
    }
}
