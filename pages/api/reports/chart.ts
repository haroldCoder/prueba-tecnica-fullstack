import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetChartUseCase } from "@/features/reports/application/use-cases/get-chart.use-case";

/**
 * @swagger
 * /api/reports/chart:
 *   get:
 *     summary: Obtiene datos para gráficos de movimientos
 *     description: Endpoint protegido que retorna datos estructurados para visualizar ingresos y egresos en gráficos
 *     tags:
 *       - Reports
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Datos del gráfico obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chart:
 *                   $ref: '#/components/schemas/ChartMovementsResponse'
 *             example:
 *               chart:
 *                 labels: ["Enero", "Febrero", "Marzo"]
 *                 income: [1500, 2000, 1800]
 *                 expense: [800, 950, 1100]
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
    const chart = await new GetChartUseCase(gateway).execute();

    return res.status(200).json({ chart });
});