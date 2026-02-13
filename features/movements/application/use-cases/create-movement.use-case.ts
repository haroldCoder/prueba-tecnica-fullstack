import { MovementGateway } from "@/features/movements/domain/gateways";
import { CreateMovementDto } from "@/features/movements/application/dto";

export class CreateMovementUseCase {
    constructor(private readonly movementGateway: MovementGateway) { }
    async execute(movement: CreateMovementDto): Promise<string> {
        return this.movementGateway.createMovement(movement);
    }
}