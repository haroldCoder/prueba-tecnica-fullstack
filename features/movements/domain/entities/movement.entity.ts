export type MovementType = "INCOME" | "EXPENSE";

export interface Movement {
    id: string;
    userId: string;
    type: MovementType;
    amount: number;
    concept: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}