import { NextApiRequest, NextApiResponse } from "next";
import { GetUsersUseCase } from "@/features/users/application/use-cases";
import { DiFactory } from "@/common/factory";
import { protectedHandler } from "@/common/auth/protected";

export default protectedHandler(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const useCase = new GetUsersUseCase(
            DiFactory.userGateway()
        );

        const users = await useCase.execute();

        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message ?? "Unexpected error",
        });
    }
});