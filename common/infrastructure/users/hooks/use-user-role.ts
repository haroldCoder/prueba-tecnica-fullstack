import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUserRole, RoleResponse } from '@/common/infrastructure/users/api';
import { QueryOptions } from '@/common/infrastructure/types';


export const userRoleKeys = {
    all: ['userRole'] as const,
    byId: (userId: string) => [...userRoleKeys.all, userId] as const,
};

export const useUserRole = (
    userId: string,
    options?: QueryOptions
): UseQueryResult<RoleResponse, Error> => {
    return useQuery({
        queryKey: userRoleKeys.byId(userId),
        queryFn: () => fetchUserRole(userId),
        enabled: options?.enabled ?? !!userId,
        staleTime: options?.staleTime ?? 5 * 60 * 1000,
        gcTime: options?.cacheTime ?? 10 * 60 * 1000,
    });
}
