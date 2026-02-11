import { ReportGateway } from "../../domain/gateways";

export class GetChartUseCase {
    constructor(private readonly reportGateway: ReportGateway) { }

    async execute() {
        return this.reportGateway.generateChartMovements();
    }
}