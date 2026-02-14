import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchMovements } from "@/features/movements/infrastructure/api";
import { QueryOptions } from "@/common/infrastructure/types";
import { QueryParamsDto } from "@/common/infrastructure/dto";
import { ResponseFetchMovementsDto } from "../dto";

export const movementKey = {
    all: ['movements'] as const,
    params: (params?: QueryParamsDto) => [...movementKey.all, params] as const,
}

export const useFetchMovements = ({ options, params }: { options?: QueryOptions, params?: QueryParamsDto }) => {
    return useQuery<ResponseFetchMovementsDto, Error>({
        queryKey: movementKey.params(params),
        queryFn: () => fetchMovements(params),
        enabled: options?.enabled,
        staleTime: options?.staleTime,
        gcTime: options?.cacheTime,
        placeholderData: keepPreviousData, // para que se mantenga la data de total y no se buguee la tabla, es decir mantenga los valores anteriores
    });
}