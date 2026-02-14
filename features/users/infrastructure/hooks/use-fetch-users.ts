import { QueryOptions } from "@/common/infrastructure/types";
import { fetchUsers } from "@/features/users/infrastructure/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ResponseFetchUsersDto } from "@/features/users/infrastructure/dto";
import { QueryParamsDto } from "@/common/infrastructure/dto";

export const usersKeys = {
    all: ['users'] as const,
    params: (params?: QueryParamsDto) => [...usersKeys.all, params] as const,
};

export const useFetchUsers = ({ options, params }: { options?: QueryOptions, params?: QueryParamsDto }) => {
    return useQuery<ResponseFetchUsersDto, Error>({
        queryKey: usersKeys.params(params),
        queryFn: () => fetchUsers(params),
        enabled: options?.enabled,
        staleTime: options?.staleTime,
        gcTime: options?.cacheTime,
        placeholderData: keepPreviousData,
    });
}