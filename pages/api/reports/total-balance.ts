import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetBalanceUseCase } from "@/features/reports/application/use-cases/get-balance.use-case";

/**
 * @swagger
 * /api/reports/total-balance:
 *   get:
 *     summary: Obtiene el balance total
 *     description: Endpoint protegido que calcula y retorna el balance total (ingresos - egresos)
 *     tags:
 *       - Reports
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Balance total calculado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Balance'
 *             example:
 *               balance: 2450.75
 *       401:
 *         description: No autenticado
 *       405:
 *         description: Método no permitido
 */
export default protectedHandler(async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const gateway = DiFactory.reportGateway();
    const balance = await new GetBalanceUseCase(gateway).execute();

    return res.status(200).json({ balance });
});