import type { NextApiRequest, NextApiResponse } from "next";
import { GetRoleUserUseCase } from "@/features/users/application/use-cases";
import { DiFactory } from "@/common/factory";
import { protectedHandler } from "@/common/auth/protected";

/**
 * @swagger
 * /api/auth/{id}/role:
 *   get:
 *     summary: Obtiene el rol de un usuario específico
 *     description: Endpoint protegido que retorna el rol asignado a un usuario mediante su ID
 *     tags:
 *       - Authentication
 *       - Users
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario
 *     responses:
 *       200:
 *         description: Rol del usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *                   enum: [ADMIN, USER]
 *                   nullable: true
 *                   description: Rol del usuario
 *             example:
 *               role: "ADMIN"
 *       400:
 *         description: ID de usuario inválido o error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Invalid user id"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Unauthorized"
 *       405:
 *         description: Método no permitido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Method Not Allowed"
 */
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