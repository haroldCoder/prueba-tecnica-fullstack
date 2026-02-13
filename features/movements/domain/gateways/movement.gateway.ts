import { Movement } from "@/features/movements/domain/entities";
import { CreateMovementDto } from "@/features/movements/application/dto";

export interface MovementGateway {
    createMovement(movement: CreateMovementDto): Promise<string>;
    getMovements(): Promise<Movement[]>;
}