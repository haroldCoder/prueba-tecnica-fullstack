import { Movement } from "../../domain/entities";

interface MovementError {
    message: string;
}

export const fetchMovements = async (): Promise<Movement[]> => {
    const response = await fetch('/api/movements/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        const error: MovementError = await response.json();
        throw new Error(error.message || 'Failed to fetch movements');
    }

    return data;
}