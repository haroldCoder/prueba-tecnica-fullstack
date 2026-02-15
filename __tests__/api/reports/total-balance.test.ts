import handler from '@/pages/api/reports/total-balance';
import { createMockRequestResponse } from '../../utils/test-helpers';
import { DiFactory } from '@/common/factory';
import { auth } from '@/common/auth';

// Mock del modulo de autenticación
jest.mock('@/common/auth', () => ({
    auth: {
        api: {
            getSession: jest.fn(),
        },
    },
}));

// Mock de DiFactory
jest.mock('@/common/factory', () => ({
    DiFactory: {
        reportGateway: jest.fn(),
    },
}));

describe('/api/reports/total-balance', () => {
    let mockSession: any;
    let mockReportGateway: any;
    const mockGetSession = auth.api.getSession as jest.MockedFunction<typeof auth.api.getSession>;

    beforeEach(() => {
        // iniciar mock de sesión
        mockSession = {
            user: {
                id: 'test-user-id',
                email: 'test@example.com',
            },
            session: {
                id: 'test-session-id',
            },
        };

        // iniciar mock de gateway
        mockReportGateway = {
            getBalance: jest.fn(),
        };

        mockGetSession.mockResolvedValue(mockSession);
        (DiFactory.reportGateway as jest.Mock).mockReturnValue(mockReportGateway);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Validación de métodos', () => {
        it('debería retornar 405 si el método no es GET', async () => {
            const { req, res } = createMockRequestResponse({
                method: 'POST',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(405);
            expect(res._getJSONData()).toEqual({ error: 'Method not allowed' });
        });

        it('debería retornar 401 si no se encuentra la sesión', async () => {
            mockGetSession.mockResolvedValue(null);

            const { req, res } = createMockRequestResponse({
                method: 'GET',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(401);
            expect(res._getJSONData()).toEqual({ message: 'Unauthorized' });
        });
    });

    describe('Peticiones GET exitosas', () => {
        it('debería retornar balance positivo cuando los ingresos superan los egresos', async () => {
            mockReportGateway.getBalance.mockResolvedValue(2450.75);

            const { req, res } = createMockRequestResponse({
                method: 'GET',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({
                balance: 2450.75,
            });
        });

        it('debería retornar balance negativo cuando los egresos superan los ingresos', async () => {
            mockReportGateway.getBalance.mockResolvedValue(-500.25);

            const { req, res } = createMockRequestResponse({
                method: 'GET',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({
                balance: -500.25,
            });
        });

        it('debería retornar balance cero cuando los ingresos igualan los egresos', async () => {
            mockReportGateway.getBalance.mockResolvedValue(0);

            const { req, res } = createMockRequestResponse({
                method: 'GET',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({
                balance: 0,
            });
        });

        it('debería retornar balance cero cuando no existen movimientos', async () => {
            mockReportGateway.getBalance.mockResolvedValue(0);

            const { req, res } = createMockRequestResponse({
                method: 'GET',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({
                balance: 0,
            });
        });
    });
});
