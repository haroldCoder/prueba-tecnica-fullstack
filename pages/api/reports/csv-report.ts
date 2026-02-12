import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetCsvReportUseCase } from "@/features/reports/application/use-cases/get-csv-report.use-case";

/**
 * @swagger
 * /api/reports/csv-report:
 *   get:
 *     summary: Genera un reporte en formato CSV
 *     description: Endpoint protegido que genera y retorna un reporte de movimientos en formato CSV
 *     tags:
 *       - Reports
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Reporte CSV generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 csv:
 *                   type: string
 *                   description: Contenido del archivo CSV
 *             example:
 *               csv: "ID,Tipo,Monto,Concepto,Fecha\n1,INCOME,1500,Salario,2026-02-01\n2,EXPENSE,500,Compras,2026-02-05"
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
    const csv = await new GetCsvReportUseCase(gateway).execute();

    return res.status(200).json({ csv });
});