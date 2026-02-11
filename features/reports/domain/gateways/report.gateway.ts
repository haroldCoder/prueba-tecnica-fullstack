import { ChartMovementsResponse } from "@/features/reports/domain/entities";

export interface ReportGateway {
    generateChartMovements(): Promise<ChartMovementsResponse>;
    getBalance(): Promise<number>;
    generateCSVReport(): Promise<string>;
}