import { ResponsePrismaLoginDto } from "@/common/infrastructure/auth/dto";

export interface AuthGateway {
    loginTest(email: string, password: string, userId: string): Promise<ResponsePrismaLoginDto>;
}