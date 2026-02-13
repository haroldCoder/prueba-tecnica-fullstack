import { UserGateway } from "@/features/users/domain/gateways/user.gateway";
import { User } from "@/common/domain/users/entities/user.entity";

export class GetUserByIdUseCase {
    constructor(private readonly userGateway: UserGateway) { }

    async execute(userId: string): Promise<User | null> {
        return this.userGateway.getUserById(userId);
    }
}
