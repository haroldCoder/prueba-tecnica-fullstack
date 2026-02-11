import { PrismaUserGateway } from "../../features/users/infrastructure/gateways/prisma-user.gateway";
import { UserGateway } from "../../features/users/domain/gateways";

export class DiFactory {
    static userGateway(): UserGateway {
        return new PrismaUserGateway();
    }
}