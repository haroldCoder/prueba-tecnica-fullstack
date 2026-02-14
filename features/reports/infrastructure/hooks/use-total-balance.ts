import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { getTotalBalance } from "../api/reports-api";

/**
 * React Query hook for fetching total balance (income - expenses)
 * 
 * @param options - Optional React Query configuration options
 * @returns Query result with balance data, loading state, and error handling
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error, refetch } = useTotalBalance();
 * 
 * if (isLoading) return <p>Loading balance...</p>;
 * if (error) return <p>Error: {error.message}</p>;
 * 
 * return <p>Balance: ${data.balance}</p>;
 * ```
 */
export function useTotalBalance(
    options?: Omit<UseQueryOptions<{ balance: number }, Error>, "queryKey" | "queryFn">
): UseQueryResult<{ balance: number }, Error> {
    return useQuery<{ balance: number }, Error>({
        queryKey: ["reports", "balance"],
        queryFn: getTotalBalance,
        staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
        refetchOnWindowFocus: true, // Refetch when user returns to tab
        ...options,
    });
}
