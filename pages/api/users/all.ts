import { NextApiRequest, NextApiResponse } from "next";
import { GetUsersUseCase } from "@/features/users/application/use-cases";
import { DiFactory } from "@/common/factory";
import { protectedHandler } from "@/common/auth/protected";

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Obtiene la lista de todos los usuarios
 *     description: Endpoint protegido que retorna todos los usuarios registrados en el sistema
 *     tags:
 *       - Users
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Error al obtener usuarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autenticado
 *       405:
 *         description: Método no permitido
 */
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