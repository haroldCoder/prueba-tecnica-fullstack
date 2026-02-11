import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetMovementsUseCase } from "@/features/movements/application/use-cases";

export default protectedHandler(async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const useCase = new GetMovementsUseCase(
            DiFactory.movementGateway()
        );

        const movements = await useCase.execute();

        return res.status(200).json(movements);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message ?? "Unexpected error",
        });
    }
})