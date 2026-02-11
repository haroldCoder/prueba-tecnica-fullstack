import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetChartUseCase } from "@/features/reports/application/use-cases/get-chart.use-case";

export default protectedHandler(async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const gateway = DiFactory.reportGateway();
    const chart = await new GetChartUseCase(gateway).execute();

    return res.status(200).json({ chart });
});