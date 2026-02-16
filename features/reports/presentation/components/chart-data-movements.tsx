import { SkeletonGeneral } from "@/common/components"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/common/components/ui/charts"
import { chartConfig } from "@/features/reports/presentation/data"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { ChartMovementsResponse } from "@/features/reports/domain/entities"
import { ScrollArea, ScrollBar } from "@/common/components/ui/scroll-area"

interface ChartDataMovementsProps {
    data?: { chart: ChartMovementsResponse }
    loading: boolean
}

export const ChartDataMovements = ({ data, loading }: ChartDataMovementsProps) => {
    if (loading) return (
        <div className="w-full h-64 flex items-center justify-center">
            <SkeletonGeneral />
        </div>
    )

    const chartData = useMemo(() => data?.chart.labels.map((label, index) => ({
        month: label,
        income: data?.chart.income[index] || 0,
        expense: data?.chart.expense[index] || 0,
    })) || [], [data]);

    const max = useMemo(() => {
        return chartData.reduce((acc, item) => {
            return Math.max(acc, item.income, item.expense);
        }, 0);
    }, [chartData]);

    const barWidth = 150;
    const chartWidth = chartData.length * barWidth;

    return (
        <div className="w-full max-w-3xl">
            <h3 className="text-lg font-semibold mb-4">
                Ingresos y Egresos
            </h3>

            <ScrollArea className="relative w-full rounded-xl border bg-card overflow-hidden p-3">
                <div style={{ width: chartWidth }}>
                    <ChartContainer className="h-72 w-full" config={chartConfig}>
                        <BarChart
                            data={chartData}
                            width={chartWidth}
                            height={300}
                            margin={{ top: 20, right: 40, left: 10, bottom: 5 }}
                            accessibilityLayer
                        >
                            <CartesianGrid vertical={false} />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                domain={[0, max * 1.1]}
                                tickFormatter={(value) =>
                                    `$${value.toLocaleString()}`
                                }
                            />

                            <ChartLegend content={<ChartLegendContent />} />

                            <Bar
                                dataKey="income"
                                fill="var(--color-income)"
                                radius={4}
                            >
                                <LabelList
                                    dataKey="income"
                                    position="top"
                                    fill="#16FF00"
                                    formatter={(value) =>
                                        value && Number(value) > 0
                                            ? `$${Number(value).toLocaleString()}`
                                            : ""
                                    }
                                />
                            </Bar>

                            <Bar
                                dataKey="expense"
                                fill="var(--color-expense)"
                                radius={4}
                            >
                                <LabelList
                                    dataKey="expense"
                                    position="top"
                                    fill="#FF0000"
                                    formatter={(value) =>
                                        value && Number(value) > 0
                                            ? `$${Number(value).toLocaleString()}`
                                            : ""
                                    }
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>

                <ScrollBar className="h-1.5 w-8/12 bottom-1 rounded-full [&>div]:rounded-full" orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}