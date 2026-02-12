import type { NextApiRequest, NextApiResponse } from 'next';
import { swaggerSpec } from '@/common/infrastructure/swagger/swagger.config';

/**
 * @swagger
 * /api/docs:
 *   get:
 *     summary: Obtiene la especificación OpenAPI en formato JSON
 *     tags: [Documentation]
 *     responses:
 *       200:
 *         description: Especificación OpenAPI
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(swaggerSpec);
}
