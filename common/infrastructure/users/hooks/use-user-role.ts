import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUserRole, RoleResponse } from '@/common/infrastructure/users/api';


export const userRoleKeys = {
    all: ['userRole'] as const,
    byId: (userId: string) => [...userRoleKeys.all, userId] as const,
};

export function useUserRole(
    userId: string,
    options?: {
        enabled?: boolean;
        staleTime?: number;
        cacheTime?: number;
    }
): UseQueryResult<RoleResponse, Error> {
    return useQuery({
        queryKey: userRoleKeys.byId(userId),
        queryFn: () => fetchUserRole(userId),
        enabled: options?.enabled ?? !!userId,
        staleTime: options?.staleTime ?? 5 * 60 * 1000,
        gcTime: options?.cacheTime ?? 10 * 60 * 1000,
    });
}
