import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/features/users/infrastructure/api";
import { toast } from "sonner";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ userId, data }: { userId: string; data: { name: string; role: string } }) =>
            updateUser(userId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("Usuario actualizado exitosamente");
        },
        onError: () => {
            toast.error("No se pudo actualizar el usuario");
        },
    });

    return {
        updateUser: mutation.mutate,
        updateUserAsync: mutation.mutateAsync,
        loading: mutation.isPending,
        error: mutation.error,
        success: mutation.isSuccess,
    };
};
