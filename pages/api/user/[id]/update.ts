import { NextApiRequest, NextApiResponse } from "next";
import { UpdateUserUseCase } from "@/features/users/application/use-cases";
import { DiFactory } from "@/common/factory";
import { protectedHandler } from "@/common/auth/protected";

export default protectedHandler(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { id } = req.query;
        const { role, name } = req.body;

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const useCase = new UpdateUserUseCase(
            DiFactory.userGateway()
        );

        const user = await useCase.execute(id, { role, name });

        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message ?? "Unexpected error",
        });
    }
});