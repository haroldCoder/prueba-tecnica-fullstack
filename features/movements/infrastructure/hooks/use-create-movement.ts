import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovement } from "@/features/movements/infrastructure/api";
import { toast } from "sonner";

export const useCreateMovement = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createMovement,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movements"] });
            toast.success("Movimiento creado exitosamente");
        },
        onError: () => {
            toast.error("No se pudo crear el movimiento");
        },
    });

    return {
        createMovement: mutation.mutate,
        createMovementAsync: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error,
        success: mutation.isSuccess,
    };
};