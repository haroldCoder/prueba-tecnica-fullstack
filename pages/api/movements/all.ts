import { protectedHandler } from "@/common/auth/protected";
import { DiFactory } from "@/common/factory";
import { GetMovementsUseCase } from "@/features/movements/application/use-cases";

/**
 * @swagger
 * /api/movements/all:
 *   get:
 *     summary: Obtiene todos los movimientos (ingresos y egresos) con paginación
 *     description: Endpoint protegido que retorna una lista paginada de movimientos del usuario
 *     tags:
 *       - Movements
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
 *         description: Lista de movimientos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movements:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movement'
 *                   description: Lista de movimientos de la página actual
 *                 total:
 *                   type: integer
 *                   description: Número total de movimientos disponibles
 *               example:
 *                 movements: []
 *                 total: 0
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
        const { page, pageSize } = req.query;
        const pageNumber = page ? parseInt(page as string) : undefined;
        const pageSizeNumber = pageSize ? parseInt(pageSize as string) : undefined;

        const useCase = new GetMovementsUseCase(
            DiFactory.movementGateway()
        );

        const result = await useCase.execute(pageNumber, pageSizeNumber);

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message ?? "Unexpected error",
        });
    }
})