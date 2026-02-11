import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetCsvReportUseCase } from "@/features/reports/application/use-cases/get-csv-report.use-case";

export default protectedHandler(async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const gateway = DiFactory.reportGateway();
    const csv = await new GetCsvReportUseCase(gateway).execute();

    return res.status(200).json({ csv });
});