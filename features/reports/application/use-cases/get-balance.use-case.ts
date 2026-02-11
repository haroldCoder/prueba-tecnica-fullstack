import { ReportGateway } from "../../domain/gateways";

export class GetBalanceUseCase {
    constructor(private readonly reportGateway: ReportGateway) { }

    async execute() {
        const balance = await this.reportGateway.getBalance();
        return balance;
    }
}