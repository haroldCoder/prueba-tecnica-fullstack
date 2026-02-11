import { Movement } from "../../domain/entities";
import { Prisma } from "@prisma/client";

export const MovementMapper = {
    toDomain(raw: Prisma.MovementGetPayload<{}>): Movement {
        return {
            id: raw.id,
            userId: raw.userId,
            type: raw.type,
            amount: raw.amount.toNumber(),
            concept: raw.concept,
            date: raw.date,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        };
    },
};