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

    /**
     * Genera la información necesaria para construir el gráfico de movimientos.
     *
     * 🔄 Actualización:
     * - Se ordenan los movimientos por fecha ascendente.
     * - Se separan los montos en income y expense.
     * - Se generan labels en formato YYYY-MM-DD.
     * 
     *  La idea era solo mostrar dos barras con el total de ingresos y egresos, 
     *  pero al final se opto por mostrar los movimientos individuales.
     *
     * @returns {ChartMovementsResponse} Datos estructurados para el gráfico.
     */
    async generateChartMovements(): Promise<ChartMovementsResponse> {
        const movements = await this.movementsGateway.getMovements();

        const sortedMovements = movements.sort((a, b) =>
            a.date.getTime() - b.date.getTime()
        );

        const incomeAmounts: number[] = [];
        const expenseAmounts: number[] = [];
        const labels: string[] = [];

        for (const movement of sortedMovements) {
            const dateLabel = movement.date.toISOString().split('T')[0];
            labels.push(dateLabel);

            const amount = Number(movement.amount);

            if (movement.type === 'INCOME') {
                incomeAmounts.push(amount);
                expenseAmounts.push(0);
            } else {
                incomeAmounts.push(0);
                expenseAmounts.push(amount);
            }
        }

        return {
            labels,
            income: incomeAmounts,
            expense: expenseAmounts,
        };
    }

    async getBalance(): Promise<number> {
        const reports = await prisma.report.findMany();

        const balance = reports.reduce((acc, report) => {
            return acc + report.balance.toNumber();
        }, 0);

        return balance;
    }


    /**
     * Genera un reporte en formato CSV con encabezados y datos de usuarios.
     * 
     * 🔄 Actualización:
     * - Se agregó la fila de encabezados al inicio del CSV
     * - Se realiza JOIN con la tabla User para obtener el nombre del usuario
     * - Se formatea correctamente la fecha de generación
     * 
     * @returns {Promise<string>} Contenido CSV completo con encabezados y datos
     */
    async generateCSVReport(): Promise<string> {
        const reports = await prisma.report.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                generatedAt: 'desc',
            },
        });

        const { CSV_REPORT_HEADERS_LINE } = await import("@/features/reports/domain/constants");

        const csvRows = reports.map((report) => {
            const formattedDate = report.generatedAt.toISOString().split('T')[0];
            return `${report.id},${report.totalIncome},${report.totalExpense},${report.balance},${report.user.name},${formattedDate}`;
        });

        return [CSV_REPORT_HEADERS_LINE, ...csvRows].join("\n");
    }
}