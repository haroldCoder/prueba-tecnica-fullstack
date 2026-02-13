import { User } from "@/common/domain/users/entities";
import { QueryOptions } from "@/common/infrastructure/types";
import { fetchUserById } from "@/features/users/infrastructure/api";
import { useQuery } from "@tanstack/react-query";

export const userKeys = {
    all: ['users'] as const,
    byId: (userId: string) => [...userKeys.all, userId] as const,
};

export const useFetchUserById = (
    userId: string,
    options?: QueryOptions
) => {
    return useQuery<User, Error>({
        queryKey: userKeys.byId(userId),
        queryFn: () => fetchUserById(userId),
        enabled: options?.enabled ?? !!userId,
        staleTime: options?.staleTime,
        gcTime: options?.cacheTime,
    });
}
