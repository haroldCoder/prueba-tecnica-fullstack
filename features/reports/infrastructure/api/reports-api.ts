import { ChartMovementsResponse } from "@/features/reports/domain/entities/chart.entity";

/**
 * Base configuration for API calls
 */
const API_BASE = "/api/reports";

/**
 * Fetches CSV report data from the API
 * 
 * @returns Promise containing the CSV string
 * @throws Error if the request fails
 */
export async function getCsvReport(): Promise<{ csv: string }> {
    const response = await fetch(`${API_BASE}/csv-report`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * Fetches the total balance (income - expenses) from the API
 * 
 * @returns Promise containing the balance number
 * @throws Error if the request fails
 */
export async function getTotalBalance(): Promise<{ balance: number }> {
    const response = await fetch(`${API_BASE}/total-balance`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * Fetches chart data for visualizing income and expenses
 * 
 * @returns Promise containing chart data with labels and values
 * @throws Error if the request fails
 */
export async function getChartData(): Promise<{ chart: ChartMovementsResponse }> {
    const response = await fetch(`${API_BASE}/chart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}
