import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { getChartData } from "../api/reports-api";
import { ChartMovementsResponse } from "@/features/reports/domain/entities/chart.entity";

/**
 * React Query hook for fetching chart data for income/expense visualization
 * 
 * @param options - Optional React Query configuration options
 * @returns Query result with chart data, loading state, and error handling
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useChartData();
 * 
 * if (isLoading) return <ChartSkeleton />;
 * if (error) return <p>Error loading chart</p>;
 * 
 * // Use data.chart with your charting library
 * return <BarChart data={data.chart} />;
 * ```
 */
export function useChartData(
    options?: Omit<UseQueryOptions<{ chart: ChartMovementsResponse }, Error>, "queryKey" | "queryFn">
): UseQueryResult<{ chart: ChartMovementsResponse }, Error> {
    return useQuery<{ chart: ChartMovementsResponse }, Error>({
        queryKey: ["reports", "chart"],
        queryFn: getChartData,
        staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
        refetchOnWindowFocus: true, // Refetch when user returns to tab
        ...options,
    });
}
