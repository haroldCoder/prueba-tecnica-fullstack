import { Movement } from "../../domain/entities";
import { MovementGateway } from "../../domain/gateways";

export class GetMovementsUseCase {
    constructor(private readonly movementGateway: MovementGateway) { }
    async execute(): Promise<Movement[]> {
        return this.movementGateway.getMovements();
    }
}