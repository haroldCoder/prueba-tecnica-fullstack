import { Movement } from "@/features/movements/domain/entities";
import { CreateMovementDto } from "@/features/movements/application/dto";

export interface MovementGateway {
    createMovement(movement: CreateMovementDto): Promise<string>;
    getMovements(page?: number, pageSize?: number): Promise<{ movements: Movement[], total: number }>;
}