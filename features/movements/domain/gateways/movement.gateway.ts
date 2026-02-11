import { Movement } from "@/features/movements/domain/entities";

export interface MovementGateway {
    createMovement(movement: Movement): Promise<string>;
    getMovements(): Promise<Movement[]>;
}