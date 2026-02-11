import type { NextApiRequest, NextApiResponse } from "next";
import { GetRoleUserUseCase } from "@/features/users/application/use-cases";
import { DiFactory } from "@/common/factory";
import { protectedHandler } from "@/common/auth/protected";

export default protectedHandler(async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { id } = req.query;

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const useCase = new GetRoleUserUseCase(
            DiFactory.userGateway()
        );

        const role = await useCase.execute(id);

        return res.status(200).json({ role });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message ?? "Unexpected error",
        });
    }
});