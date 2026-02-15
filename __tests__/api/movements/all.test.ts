import handler from '@/pages/api/movements/all';
import { createMockRequestResponse, createMockMovement } from '../../utils/test-helpers';
import { DiFactory } from '@/common/factory';
import { auth } from '@/common/auth';

// Mock del modulo de autenticacion
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
        movementGateway: jest.fn(),
    },
}));

describe('/api/movements/all', () => {
    let mockSession: any;
    let mockMovementGateway: any;
    const mockGetSession = auth.api.getSession as jest.MockedFunction<typeof auth.api.getSession>;

    beforeEach(() => {
        // iniciar mock de sesion
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
        mockMovementGateway = {
            getMovements: jest.fn(),
        };

        mockGetSession.mockResolvedValue(mockSession);
        (DiFactory.movementGateway as jest.Mock).mockReturnValue(mockMovementGateway);
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
            expect(res._getJSONData()).toEqual({ message: 'Method Not Allowed' });
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
        it('debería retornar movimientos paginados con paginación por defecto', async () => {
            const mockMovements = [
                createMockMovement({ id: '1', concept: 'Movement 1' }),
                createMockMovement({ id: '2', concept: 'Movement 2' }),
            ];

            mockMovementGateway.getMovements.mockResolvedValue({
                movements: mockMovements,
                total: 2,
            });

            const { req, res } = createMockRequestResponse({
                method: 'GET',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({
                movements: mockMovements,
                total: 2,
            });
            expect(mockMovementGateway.getMovements).toHaveBeenCalledWith(undefined, undefined);
        });

        it('debería retornar movimientos paginados con parámetros personalizados', async () => {
            const mockMovements = [
                createMockMovement({ id: '1', concept: 'Movement 1' }),
            ];

            mockMovementGateway.getMovements.mockResolvedValue({
                movements: mockMovements,
                total: 10,
            });

            const { req, res } = createMockRequestResponse({
                method: 'GET',
                query: { page: '2', pageSize: '5' },
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({
                movements: mockMovements,
                total: 10,
            });
            expect(mockMovementGateway.getMovements).toHaveBeenCalledWith(2, 5);
        });
    });
});
