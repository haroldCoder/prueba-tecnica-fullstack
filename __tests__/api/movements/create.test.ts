import handler from '@/pages/api/movements/create';
import { createMockRequestResponse } from '../../utils/test-helpers';
import { DiFactory } from '@/common/factory';
import { auth } from '@/common/auth';

// Mock the auth module
jest.mock('@/common/auth', () => ({
    auth: {
        api: {
            getSession: jest.fn(),
        },
    },
}));

// Mock DiFactory
jest.mock('@/common/factory', () => ({
    DiFactory: {
        movementGateway: jest.fn(),
    },
}));

describe('/api/movements/create', () => {
    let mockSession: any;
    let mockMovementGateway: any;
    const mockGetSession = auth.api.getSession as jest.MockedFunction<typeof auth.api.getSession>;

    beforeEach(() => {
        // Setup mock session
        mockSession = {
            user: {
                id: 'test-user-id',
                email: 'test@example.com',
            },
            session: {
                id: 'test-session-id',
            },
        };

        // Setup mock gateway
        mockMovementGateway = {
            createMovement: jest.fn(),
        };

        mockGetSession.mockResolvedValue(mockSession);
        (DiFactory.movementGateway as jest.Mock).mockReturnValue(mockMovementGateway);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Validación de métodos', () => {
        it('debería retornar 405 si el método no es POST', async () => {
            const { req, res } = createMockRequestResponse({
                method: 'GET',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(405);
            expect(res._getJSONData()).toEqual({ message: 'Method Not Allowed' });
        });

        it('debería retornar 401 si no se encuentra la sesión', async () => {
            mockGetSession.mockResolvedValue(null);

            const { req, res } = createMockRequestResponse({
                method: 'POST',
                body: {
                    type: 'INCOME',
                    concept: 'Test',
                    amount: 1000,
                    date: '2026-02-14',
                    userId: 'user-id',
                },
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(401);
            expect(res._getJSONData()).toEqual({ message: 'Unauthorized' });
        });
    });

    describe('Peticiones POST exitosas', () => {
        it('debería crear un movimiento exitosamente', async () => {
            mockMovementGateway.createMovement.mockResolvedValue('new-movement-id');

            const { req, res } = createMockRequestResponse({
                method: 'POST',
                body: {
                    type: 'INCOME',
                    concept: 'Salary',
                    amount: 5000,
                    date: '2026-02-14',
                    userId: 'user-id',
                },
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({
                message: 'Movement created successfully',
            });
            expect(mockMovementGateway.createMovement).toHaveBeenCalledWith({
                type: 'INCOME',
                concept: 'Salary',
                amount: 5000,
                date: '2026-02-14',
                userId: 'user-id',
            });
        });

        it('debería crear un movimiento de tipo EXPENSE', async () => {
            mockMovementGateway.createMovement.mockResolvedValue('expense-id');

            const { req, res } = createMockRequestResponse({
                method: 'POST',
                body: {
                    type: 'EXPENSE',
                    concept: 'Groceries',
                    amount: 200,
                    date: '2026-02-14',
                    userId: 'user-id',
                },
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(mockMovementGateway.createMovement).toHaveBeenCalled();
        });
    });

    describe('Validación de request', () => {
        it('debería retornar 400 si falta el campo type', async () => {
            const { req, res } = createMockRequestResponse({
                method: 'POST',
                body: {
                    concept: 'Test',
                    amount: 1000,
                    date: '2026-02-14',
                    userId: 'user-id',
                },
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual({ message: 'Missing required fields' });
        });
    });
});
