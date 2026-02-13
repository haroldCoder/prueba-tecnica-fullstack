"use client";

import React from "react";
import { useChartData } from "../hooks/use-chart-data";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "@/common/components/ui/charts";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";


export function ChartDataExample() {
    const { data, isLoading, error } = useChartData();

    const chartConfig = {
        income: {
            label: "Ingresos",
            color: "#10b981",
        },
        expense: {
            label: "Egresos",
            color: "#ef4444",
        },
    } satisfies ChartConfig;

    if (isLoading) {
        return (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg animate-pulse">
                <div className="text-gray-500">Cargando gráfico...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-64 flex items-center justify-center bg-red-50 rounded-lg border border-red-200">
                <div className="text-center">
                    <p className="text-red-700 font-medium">Error al cargar el gráfico</p>
                    <p className="text-red-600 text-sm mt-1">{error.message}</p>
                </div>
            </div>
        );
    }

    const chartData = data?.chart.labels.map((label, index) => ({
        month: label,
        income: data.chart.income[index] || 0,
        expense: data.chart.expense[index] || 0,
    })) || [];

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">Ingresos y Egresos</h3>
            <ChartContainer config={chartConfig} className="w-full h-64">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <YAxis
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                    <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
