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

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "July", desktop: 195 },
    { month: "August", desktop: 250 },
    { month: "September", desktop: 280 },
    { month: "October", desktop: 220 },
    { month: "November", desktop: 190 },
    { month: "December", desktop: 300 },
]

const chartConfig = {
    desktop: {
        label: "Earnings",
        color: "#F7B696",
    },
} satisfies ChartConfig

export function FeesChart() {
    return (
        <Card className="sm:w-full md:w-[900px] bg-defaultGray rounded-2xl border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-defaultBlue">Earnings</CardTitle>
                <Select>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="2024"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">2024</SelectItem>
                        <SelectItem value="dark">2023</SelectItem>
                        <SelectItem value="system">2022</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="md:h-[300px] md:w-[850px]">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
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
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
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
        </Card>
    )
}

export default FeesChart;