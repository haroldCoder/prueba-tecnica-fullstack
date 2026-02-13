import { User } from "@/common/domain/users/entities";
import { QueryOptions } from "@/common/infrastructure/types";
import { fetchUsers } from "@/features/users/infrastructure/api";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsers = (options?: QueryOptions) => {
    return useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        enabled: options?.enabled,
        staleTime: options?.staleTime,
        gcTime: options?.cacheTime,
    });
}