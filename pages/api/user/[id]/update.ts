import { NextApiRequest, NextApiResponse } from "next";
import { UpdateUserUseCase } from "@/features/users/application/use-cases";
import { DiFactory } from "@/common/factory";
import { protectedHandler } from "@/common/auth/protected";

/**
 * @swagger
 * /api/user/{id}/update:
 *   put:
 *     summary: Actualiza la información de un usuario
 *     description: Endpoint protegido para actualizar el rol y/o nombre de un usuario específico
 *     tags:
 *       - Users
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ADMIN, USER]
 *                 description: Nuevo rol del usuario
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del usuario
 *           example:
 *             role: "ADMIN"
 *             name: "Juan Pérez"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID inválido o error en la actualización
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