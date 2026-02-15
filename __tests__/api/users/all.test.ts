import handler from '@/pages/api/users/all';
import { createMockRequestResponse, createMockUser } from '../../utils/test-helpers';
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
        userGateway: jest.fn(),
    },
}));

describe('/api/users/all', () => {
    let mockSession: any;
    let mockUserGateway: any;
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
        mockUserGateway = {
            getAllUsers: jest.fn(),
        };

        mockGetSession.mockResolvedValue(mockSession);
        (DiFactory.userGateway as jest.Mock).mockReturnValue(mockUserGateway);
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
        it('debería retornar usuarios paginados con paginación por defecto', async () => {
            const mockUsers = [
                createMockUser({ id: '1', email: 'user1@test.com' }),
                createMockUser({ id: '2', email: 'user2@test.com' }),
            ];

            mockUserGateway.getAllUsers.mockResolvedValue({
                users: mockUsers,
                total: 2,
            });

            const { req, res } = createMockRequestResponse({
                method: 'GET',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({
                users: mockUsers,
                total: 2,
            });
        });

        it('debería retornar usuarios paginados con parámetros personalizados', async () => {
            const mockUsers = [
                createMockUser({ id: '1', email: 'user1@test.com' }),
            ];

            mockUserGateway.getAllUsers.mockResolvedValue({
                users: mockUsers,
                total: 10,
            });

            const { req, res } = createMockRequestResponse({
                method: 'GET',
                query: { page: '2', pageSize: '5' },
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(200);
            expect(res._getJSONData()).toEqual({
                users: mockUsers,
                total: 10,
            });
        });
    });

    describe('Manejo de errores', () => {
        it('debería retornar 400 cuando el gateway lanza un error', async () => {
            mockUserGateway.getAllUsers.mockRejectedValue(
                new Error('Database connection failed')
            );

            const { req, res } = createMockRequestResponse({
                method: 'GET',
            });

            await handler(req, res);

            expect(res._getStatusCode()).toBe(400);
            expect(res._getJSONData()).toEqual({
                message: 'Database connection failed',
            });
        });
    });

    describe('Parseo de parámetros de query', () => {
        it('debería parsear correctamente el parámetro page', async () => {
            mockUserGateway.getAllUsers.mockResolvedValue({
                users: [],
                total: 0,
            });

            const { req, res } = createMockRequestResponse({
                method: 'GET',
                query: { page: '3' },
            });

            await handler(req, res);

            expect(mockUserGateway.getAllUsers).toHaveBeenCalledWith(3, undefined);
        });

        it('debería parsear correctamente el parámetro pageSize', async () => {
            mockUserGateway.getAllUsers.mockResolvedValue({
                users: [],
                total: 0,
            });

            const { req, res } = createMockRequestResponse({
                method: 'GET',
                query: { pageSize: '20' },
            });

            await handler(req, res);

            expect(mockUserGateway.getAllUsers).toHaveBeenCalledWith(undefined, 20);
        });

        it('debería parsear correctamente ambos parámetros page y pageSize', async () => {
            mockUserGateway.getAllUsers.mockResolvedValue({
                users: [],
                total: 0,
            });

            const { req, res } = createMockRequestResponse({
                method: 'GET',
                query: { page: '1', pageSize: '50' },
            });

            await handler(req, res);

            expect(mockUserGateway.getAllUsers).toHaveBeenCalledWith(1, 50);
        });
    });
});
