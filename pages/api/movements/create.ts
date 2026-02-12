import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { CreateMovementUseCase } from "@/features/movements/application/use-cases";

/**
 * @swagger
 * /api/movements/create:
 *   post:
 *     summary: Crea un nuevo movimiento (ingreso o egreso)
 *     description: Endpoint protegido para registrar un nuevo movimiento financiero
 *     tags:
 *       - Movements
 *     security:
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMovementInput'
 *           example:
 *             type: "INCOME"
 *             amount: 1500.50
 *             concept: "Salario mensual"
 *             date: "2026-02-12T10:00:00Z"
 *     responses:
 *       200:
 *         description: Movimiento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movement'
 *       400:
 *         description: Datos inválidos o error al crear movimiento
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
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const useCase = new CreateMovementUseCase(
            DiFactory.movementGateway()
        );

        const movements = await useCase.execute(req.body);

        return res.status(200).json(movements);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message ?? "Unexpected error",
        });
    }
})