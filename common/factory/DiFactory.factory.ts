import { PrismaUserGateway } from "../../features/users/infrastructure/gateways/prisma-user.gateway";
import { UserGateway } from "../../features/users/domain/gateways";
import { MovementGateway } from "@/features/movements/domain/gateways";
import { PrismaMovementsGateway } from "@/features/movements/infrastructure/gateways";
import { ReportGateway } from "@/features/reports/domain/gateways";
import { PrismaReportGateway } from "@/features/reports/infrastructure/gateways/prisma-report.gateway";

export class DiFactory {
    static userGateway(): UserGateway {
        return new PrismaUserGateway();
    }

    static movementGateway(): MovementGateway {
        return new PrismaMovementsGateway();
    }

    static reportGateway(): ReportGateway {
        return new PrismaReportGateway();
    }
}