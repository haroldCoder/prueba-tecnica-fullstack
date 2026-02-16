import type { NextApiRequest, NextApiResponse } from 'next';
import { swaggerSpec } from '@/common/infrastructure/swagger/swagger.config';
import fs from 'fs';
import path from 'path';

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
    const jsonPath = path.join(process.cwd(), 'public', 'swagger.json');

    if (fs.existsSync(jsonPath)) {
        const fileContent = fs.readFileSync(jsonPath, 'utf8');
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(fileContent);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(swaggerSpec);
}
