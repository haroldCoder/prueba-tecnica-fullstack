import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetChartUseCase } from "@/features/reports/application/use-cases/get-chart.use-case";

/**
 * @swagger
 * /api/reports/chart:
 *   get:
 *     summary: Obtiene todos los movimientos individuales para gráficos
 *     description: |
 *       Endpoint protegido que retorna arreglos con TODOS los montos individuales de ingresos y egresos.
 *       Cada elemento en los arreglos representa un movimiento individual ordenado por fecha.
 *       - Si el movimiento es INCOME: el valor aparece en el arreglo 'income' y 0 en 'expense'
 *       - Si el movimiento es EXPENSE: el valor aparece en el arreglo 'expense' y 0 en 'income'
 *       - labels: contiene las fechas de cada movimiento en formato YYYY-MM-DD
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
 *                   type: object
 *                   properties:
 *                     labels:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Arreglo de fechas en formato YYYY-MM-DD para cada movimiento
 *                     income:
 *                       type: array
 *                       items:
 *                         type: number
 *                       description: Arreglo con todos los montos de ingresos (0 si el movimiento es egreso)
 *                     expense:
 *                       type: array
 *                       items:
 *                         type: number
 *                       description: Arreglo con todos los montos de egresos (0 si el movimiento es ingreso)
 *             example:
 *               chart:
 *                 labels: ["2026-02-01", "2026-02-05", "2026-02-10", "2026-02-15"]
 *                 income: [1500, 0, 2000, 0]
 *                 expense: [0, 500, 0, 800]
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