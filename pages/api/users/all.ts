import { NextApiRequest, NextApiResponse } from "next";
import { GetUsersUseCase } from "@/features/users/application/use-cases";
import { DiFactory } from "@/common/factory";
import { protectedHandler } from "@/common/auth/protected";

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Obtiene la lista de todos los usuarios con paginación
 *     description: Endpoint protegido que retorna una lista paginada de usuarios registrados en el sistema
 *     tags:
 *       - Users
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página a obtener
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad de elementos por página
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                   description: Lista de usuarios de la página actual
 *                 total:
 *                   type: integer
 *                   description: Número total de usuarios disponibles
 *               example:
 *                 users: []
 *                 total: 0
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
        const { page, pageSize } = req.query;
        const pageNumber = page ? parseInt(page as string) : undefined;
        const pageSizeNumber = pageSize ? parseInt(pageSize as string) : undefined;

        const useCase = new GetUsersUseCase(
            DiFactory.userGateway()
        );

        const result = await useCase.execute(pageNumber, pageSizeNumber);

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message ?? "Unexpected error",
        });
    }
});