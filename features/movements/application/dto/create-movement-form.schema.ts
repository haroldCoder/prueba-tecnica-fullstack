// este dto nos sirve para validar el formulario

import { z } from "zod";
import { MovementTypeEnum } from "@/features/movements/domain/entities";

export const CreateMovementSchema = z.object({
    concept: z.string().min(1, "El concepto es obligatorio"),
    amount: z.number().positive("Debe ser mayor a 0"),
    date: z.date(),
    type: z.nativeEnum(MovementTypeEnum),
});

export type CreateMovementForm = z.infer<typeof CreateMovementSchema>;