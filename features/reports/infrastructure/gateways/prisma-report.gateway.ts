import { ReportGateway } from "@/features/reports/domain/gateways";
import { ChartMovementsResponse } from "@/features/reports/domain/entities";
import { MovementGateway } from "@/features/movements/domain/gateways";
import { DiFactory } from "@/common/factory";
import { prisma } from "@/common/infrastructure/database/prisma.client";

export class PrismaReportGateway implements ReportGateway {
    private readonly movementsGateway: MovementGateway;

    constructor() {
        this.movementsGateway = DiFactory.movementGateway();
    }

    async generateChartMovements(): Promise<ChartMovementsResponse> {
        const movements = await this.movementsGateway.getMovements();

        const grouped: Record<
            string,
            { income: number; expense: number }
        > = {};

        for (const movement of movements) {
            const month = movement.date.toISOString().slice(0, 7);

            if (!grouped[month]) {
                grouped[month] = { income: 0, expense: 0 };
            }

            const amount = Number(movement.amount);

            if (movement.type === 'INCOME') {
                grouped[month].income += amount;
            } else {
                grouped[month].expense += amount;
            }
        }

        const labels = Object.keys(grouped).sort();

        return {
            labels,
            income: labels.map((label) => grouped[label].income),
            expense: labels.map((label) => grouped[label].expense),
        };
    }

    async getBalance(): Promise<number> {
        const reports = await prisma.report.findMany();

        const balance = reports.reduce((acc, report) => {
            return acc + report.balance.toNumber();
        }, 0);

        return balance;
    }

    async generateCSVReport(): Promise<string> {
        const reports = await prisma.report.findMany();

        const csv = reports.map((report) => {
            return `${report.id},${report.totalIncome},${report.totalExpense},${report.balance},${report.generatedBy},${report.generatedAt}`;
        });

        return csv.join("\n");
    }
}