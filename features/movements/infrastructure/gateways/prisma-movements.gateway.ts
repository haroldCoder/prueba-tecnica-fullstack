import { Movement } from "@/features/movements/domain/entities";
import { MovementGateway } from "@/features/movements/domain/gateways";
import { prisma } from "@/common/infrastructure/database/prisma.client";
import { MovementMapper } from "@/features/movements/infrastructure/mappers";

export class PrismaMovementsGateway implements MovementGateway {
    async createMovement(movement: Movement): Promise<string> {
        try {
            const { id, ...rest } = movement;

            const createdMovement = await prisma.movement.create({
                data: {
                    type: rest.type,
                    concept: rest.concept,
                    amount: rest.amount,
                    date: rest.date,
                    userId: movement.userId,
                },
            });
            return "Movement created successfully";
        } catch (error) {
            console.error("Error creating movement:", error);
            throw error;
        }
    }
    async getMovements(): Promise<Movement[]> {
        const movements = await prisma.movement.findMany();
        return movements.map(MovementMapper.toDomain);
    }
}