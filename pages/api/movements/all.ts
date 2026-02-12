import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetMovementsUseCase } from "@/features/movements/application/use-cases";

/**
 * @swagger
 * /api/movements/all:
 *   get:
 *     summary: Obtiene todos los movimientos (ingresos y egresos)
 *     description: Endpoint protegido que retorna la lista completa de movimientos del usuario
 *     tags:
 *       - Movements
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimientos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movement'
 *       400:
 *         description: Error al obtener movimientos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autenticado
 *       405:
 *         description: Método no permitido
 */
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