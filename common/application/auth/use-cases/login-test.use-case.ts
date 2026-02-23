import { AuthGateway } from "@/common/domain/auth/gateways/auth.gateways";
import { ResponsePrismaLoginDto } from "@/common/infrastructure/auth/dto";

export class LoginTestUseCase {
    constructor(private readonly authGateway: AuthGateway) { }

    async execute(email: string, password: string, userId: string): Promise<ResponsePrismaLoginDto> {
        return this.authGateway.loginTest(email, password, userId);
    }
}