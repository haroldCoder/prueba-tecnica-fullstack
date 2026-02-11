import { MovementGateway } from "../../domain/gateways";
import { Movement } from "../../domain/entities";

export class CreateMovementUseCase {
    constructor(private readonly movementGateway: MovementGateway) { }
    async execute(movement: Movement): Promise<string> {
        return this.movementGateway.createMovement(movement);
    }
}