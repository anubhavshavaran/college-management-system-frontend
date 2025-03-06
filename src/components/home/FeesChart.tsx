import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart.tsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useState} from "react";
import {usePaymentsData} from "@/hooks/dashboard.ts";
import Spinner from "@/components/ui/Spinner.tsx";

const chartConfig = {
    totalAmount: {
        label: "Earnings",
        color: "#F7B696",
    },
} satisfies ChartConfig;

const range = (start: number, end: number) => Array.from({length: end - start + 1}, (_, i) => start + i);

export function FeesChart() {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<number | string>(currentYear);
    const {data, isPending} = usePaymentsData(year);

    const years = range(2020, currentYear);

    return (
        <Card className="sm:w-full md:w-[800px] bg-defaultGray rounded-2xl border-none shadow-none">
            {isPending ? (
                <Spinner/>
            ) : (
                <>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-defaultBlue">Earnings</CardTitle>
                        <Select onValueChange={(y) => setYear(y)}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder={year}/>
                            </SelectTrigger>
                            <SelectContent>
                                {years.reverse().map((y: number) => (
                                    <SelectItem value={`${y}`}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="md:h-[300px] md:w-[750px]">
                            <BarChart
                                accessibilityLayer
                                data={data}
                                margin={{
                                    top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    tickFormatter={(value) => `${value}`} // Optional: Format Y-axis labels
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel/>}
                                />
                                <Bar dataKey="totalAmount" fill="var(--color-totalAmount)" radius={8}>
                                    <LabelList
                                        position="top"
                                        offset={12}
                                        className="fill-foreground"
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </>
            )}
        </Card>
    )
}

export default FeesChart;