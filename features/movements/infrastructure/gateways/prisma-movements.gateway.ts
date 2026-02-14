import { Movement } from "@/features/movements/domain/entities";
import { MovementGateway } from "@/features/movements/domain/gateways";
import { prisma } from "@/common/infrastructure/database/prisma.client";
import { MovementMapper } from "@/features/movements/infrastructure/mappers";
import { CreateMovementDto } from "@/features/movements/application/dto";

export class PrismaMovementsGateway implements MovementGateway {
    async createMovement(movement: CreateMovementDto): Promise<string> {
        try {
            await prisma.movement.create({
                data: {
                    type: movement.type,
                    concept: movement.concept,
                    amount: movement.amount,
                    date: movement.date,
                    userId: movement.userId,
                },
            });
            return "Movement created successfully";
        } catch (error) {
            console.error("Error creating movement:", error);
            throw error;
        }
    }
    async getMovements(page: number = 1, pageSize: number = 10): Promise<{ movements: Movement[], total: number }> {
        const skip = (page - 1) * pageSize;

        const [movements, total] = await Promise.all([
            prisma.movement.findMany({
                skip,
                take: pageSize,
                include: {
                    user: { select: { name: true } },
                },
                orderBy: {
                    date: 'desc'
                }
            }),
            prisma.movement.count()
        ]);

        return {
            movements: movements.map(MovementMapper.toDomain),
            total
        };
    }
}