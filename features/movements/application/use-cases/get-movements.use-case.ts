import { Movement } from "../../domain/entities";
import { MovementGateway } from "../../domain/gateways";

export class GetMovementsUseCase {
    constructor(private readonly movementGateway: MovementGateway) { }
    async execute(page?: number, pageSize?: number): Promise<{ movements: Movement[], total: number }> {
        return this.movementGateway.getMovements(page, pageSize);
    }
}