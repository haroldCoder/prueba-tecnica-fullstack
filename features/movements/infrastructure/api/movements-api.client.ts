import { CreateMovementDto } from "@/features/movements/application/dto";
import { Movement } from "@/features/movements/domain/entities";
import { QueryParamsDto } from "@/common/infrastructure/dto";
import { ResponseFetchMovementsDto } from "../dto";

interface MovementError {
    message: string;
}

export const fetchMovements = async (params?: QueryParamsDto): Promise<ResponseFetchMovementsDto> => {
    const response = await fetch(`/api/movements/all?page=${params?.page}&pageSize=${params?.pageSize}`, {
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

export const createMovement = async (movement: CreateMovementDto): Promise<string> => {
    const response = await fetch('/api/movements/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movement),
    });
    const data = await response.json();

    if (!response.ok) {
        const error: MovementError = await response.json();
        throw new Error(error.message || 'Failed to create movement');
    }

    return data;
}