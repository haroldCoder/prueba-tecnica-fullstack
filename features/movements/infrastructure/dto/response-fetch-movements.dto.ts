import { Movement } from "@/features/movements/domain/entities";

export interface ResponseFetchMovementsDto {
    movements: Movement[];
    total: number;
}