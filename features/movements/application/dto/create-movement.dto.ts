export interface CreateMovementDto {
    type: "INCOME" | "EXPENSE";
    concept: string;
    amount: number;
    date: Date;
    userId: string;
}