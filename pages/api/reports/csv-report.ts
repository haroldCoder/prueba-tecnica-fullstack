import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetCsvReportUseCase } from "@/features/reports/application/use-cases/get-csv-report.use-case";

/**
 * @swagger
 * /api/reports/csv-report:
 *   get:
 *     summary: Genera un reporte en formato CSV con encabezados
 *     description: |
 *       Endpoint protegido que genera y retorna un reporte financiero en formato CSV.
 *       
 *       **Características:**
 *       - Incluye fila de encabezados en la primera línea
 *       - Muestra el nombre del usuario que generó el reporte (no solo el ID)
 *       - Ordena los reportes por fecha de generación (más reciente primero)
 *       - Formatea las fechas en formato ISO (YYYY-MM-DD)
 *       
 *       **Columnas del CSV:**
 *       1. ID - Identificador único del reporte
 *       2. Total Ingresos - Suma total de ingresos
 *       3. Total Egresos - Suma total de egresos
 *       4. Balance - Diferencia entre ingresos y egresos
 *       5. Generado Por - Nombre del usuario que generó el reporte
 *       6. Fecha de Generación - Fecha en formato YYYY-MM-DD
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
 *                   description: Contenido del archivo CSV con encabezados y datos
 *             example:
 *               csv: "ID,Total Ingresos,Total Egresos,Balance,Generado Por,Fecha de Generación\nabc-123,15000,8500,6500,Juan Pérez,2026-02-13\ndef-456,12000,9000,3000,María García,2026-02-12"
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