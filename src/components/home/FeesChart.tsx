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
} satisfies ChartConfig

export function FeesChart() {
    const [year, setYear] = useState<number | string>(function () {
        return new Date().getFullYear();
    });
    const {data, isPending} = usePaymentsData(year);

    return (
        <Card className="sm:w-full md:w-[900px] bg-defaultGray rounded-2xl border-none shadow-none">
            {isPending ? (
                <Spinner/>
            ) : (
                <>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-defaultBlue">Earnings</CardTitle>
                        <Select onValueChange={(y) => setYear(y)}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="2024"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="md:h-[300px] md:w-[850px]">
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