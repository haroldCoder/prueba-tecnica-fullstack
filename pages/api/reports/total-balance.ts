import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetBalanceUseCase } from "@/features/reports/application/use-cases/get-balance.use-case";

export default protectedHandler(async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const gateway = DiFactory.reportGateway();
    const balance = await new GetBalanceUseCase(gateway).execute();

    return res.status(200).json({ balance });
});