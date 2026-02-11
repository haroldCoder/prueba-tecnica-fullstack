import { PrismaUserGateway } from "../../features/users/infrastructure/gateways/prisma-user.gateway";
import { UserGateway } from "../../features/users/domain/gateways";
import { MovementGateway } from "@/features/movements/domain/gateways";
import { PrismaMovementsGateway } from "@/features/movements/infrastructure/gateways";

export class DiFactory {
    static userGateway(): UserGateway {
        return new PrismaUserGateway();
    }

    static movementGateway(): MovementGateway {
        return new PrismaMovementsGateway();
    }
}