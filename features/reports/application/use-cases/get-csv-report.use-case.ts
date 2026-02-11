import { ReportGateway } from "../../domain/gateways";

export class GetCsvReportUseCase {
    constructor(private readonly reportGateway: ReportGateway) { }

    async execute() {
        const csv = await this.reportGateway.generateCSVReport();
        return csv;
    }
}
