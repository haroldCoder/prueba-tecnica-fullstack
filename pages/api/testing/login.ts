import type { NextApiRequest, NextApiResponse } from 'next'
import { DiFactory } from '@/common/factory'

const TEST_USER_EMAIL = 'test-cypress@example.com'
const TEST_USER_ID = 'user-test-cypress'

export const TEST_USER_PASSWORD = 'Cypress@Test1234!'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(404).json({ error: 'Not found' })
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const authGateway = DiFactory.authGateway();
        const { token, cookieExpires, user } = await authGateway.loginTest(TEST_USER_EMAIL, TEST_USER_PASSWORD, TEST_USER_ID);

        return res.status(200).json({
            ok: true,
            token: token,
            password: TEST_USER_PASSWORD,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        })
    } catch (error) {
        console.error('❌ Error en test login:', error)
        return res.status(500).json({ error: 'Error creando sesión de prueba', detail: String(error) })
    }
}
