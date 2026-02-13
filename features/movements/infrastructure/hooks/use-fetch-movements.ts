import { useQuery } from "@tanstack/react-query";
import { fetchMovements } from "@/features/movements/infrastructure/api";
import { Movement } from "@/features/movements/domain/entities";
import { QueryOptions } from "@/common/infrastructure/types";

export const useFetchMovements = (options?: QueryOptions) => {
    return useQuery<Movement[], Error>({
        queryKey: ["movements"],
        queryFn: fetchMovements,
        enabled: options?.enabled,
        staleTime: options?.staleTime,
        gcTime: options?.cacheTime,
    });
}