import { SkeletonGeneral } from "@/common/components"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/common/components/ui/charts"
import { chartConfig } from "@/features/reports/presentation/data"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { ChartMovementsResponse } from "@/features/reports/domain/entities"

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

    const barWidth = 40;
    const chartWidth = chartData.length * barWidth;

    return (
        <div className="w-full max-w-3xl">
            <h3 className="text-lg font-semibold mb-4">Ingresos y Egresos</h3>
            <ChartContainer className="h-72 w-full" config={chartConfig}>
                <BarChart margin={{ top: 20, right: 40, left: 10, bottom: 5 }}
                    accessibilityLayer data={chartData} width={chartWidth}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />

                    <YAxis
                        tickLine={false}
                        domain={[0, max * 1.1]}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />

                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="income" fill="var(--color-income)" radius={4}>
                        <LabelList
                            fill="white"
                            dataKey="income"
                            position="top"
                            formatter={(value) => {
                                if (value && parseInt(value.toString()) > 0) {
                                    return `$${value?.toLocaleString()}`
                                }
                                return ''
                            }}
                        />
                    </Bar>
                    <Bar dataKey="expense" fill="var(--color-expense)" radius={4}>
                        <LabelList
                            fill="white"
                            dataKey="expense"
                            position="top"
                            formatter={(value) => {
                                if (value && parseInt(value.toString()) > 0) {
                                    return `$${value?.toLocaleString()}`
                                }
                                return ''
                            }}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        </div>
    )
}