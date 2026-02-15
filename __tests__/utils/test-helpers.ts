import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';

/**
 * crear mock de request y response
 */
export function createMockRequestResponse(options: {
    method?: RequestMethod;
    query?: Record<string, string | string[]>;
    body?: any;
    headers?: Record<string, string>;
}) {
    return createMocks<NextApiRequest, NextApiResponse>({
        method: options.method || 'GET',
        query: options.query || {},
        body: options.body || {},
        headers: options.headers || {},
    });
}

/**
 * Mock movimiento
 */
export function createMockMovement(overrides?: Partial<any>) {
    return {
        id: 'mock-movement-id',
        type: 'INCOME',
        concept: 'Test Movement',
        amount: 1000,
        date: new Date('2026-02-14').toISOString(),
        userId: 'mock-user-id',
        createdAt: new Date('2026-02-14').toISOString(),
        updatedAt: new Date('2026-02-14').toISOString(),
        ...overrides,
    };
}

/**
 * contruir mock para crear usuario
 */
export function createMockUser(overrides?: Partial<any>) {
    return {
        id: 'mock-user-id',
        email: 'test@example.com',
        name: 'Test User',
        emailVerified: false,
        createdAt: new Date('2026-02-14').toISOString(),
        updatedAt: new Date('2026-02-14').toISOString(),
        ...overrides,
    };
}

/**
 * Helper para mockear metodos de gateway
 */
export function mockGateway<T extends Record<string, any>>(methods: T): T {
    return methods;
}

/**
 * Helper para crear un mock de un handler protegido
 * Simula el contexto de un usuario autenticado
 */
export function createMockAuthContext(userId = 'mock-user-id') {
    return {
        user: {
            id: userId,
            email: 'test@example.com',
            name: 'Test User',
        },
        session: {
            id: 'mock-session-id',
            userId,
            expiresAt: new Date(Date.now() + 86400000), // 24 hours from now
        },
    };
}
