import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { getCsvReport } from "../api/reports-api";

/**
 * React Query hook for fetching CSV report data
 * 
 * @param options - Optional React Query configuration options
 * @returns Query result with CSV data, loading state, and error handling
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCsvReport();
 * 
 * if (isLoading) return <p>Loading...</p>;
 * if (error) return <p>Error: {error.message}</p>;
 * 
 * // Use data.csv to download or display
 * ```
 */
export function useCsvReport(
    options?: Omit<UseQueryOptions<{ csv: string }, Error>, "queryKey" | "queryFn">
): UseQueryResult<{ csv: string }, Error> {
    return useQuery<{ csv: string }, Error>({
        queryKey: ["reports", "csv"],
        queryFn: getCsvReport,
        staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
        ...options,
    });
}
