import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";

const chartData = [
    {class: "Nursery", paid: 186, remaining: 80},
    {class: "LKG", paid: 305, remaining: 200},
    {class: "UKG", paid: 237, remaining: 120},
    {class: "1st", paid: 73, remaining: 190},
    {class: "2nd", paid: 209, remaining: 130},
    {class: "3rd", paid: 186, remaining: 80},
    {class: "4th", paid: 305, remaining: 200},
    {class: "5th", paid: 237, remaining: 120},
    {class: "6th", paid: 73, remaining: 190},
    {class: "7th", paid: 209, remaining: 130},
    {class: "8th", paid: 214, remaining: 140},
    {class: "9th", paid: 214, remaining: 140},
    {class: "10th", paid: 214, remaining: 140},
]
const chartConfig = {
    paid: {
        label: "Paid",
        color: "hsl(var(--chart-1))",
    },
    remaining: {
        label: "Remaining",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

function FeesChart() {
    return (
        <Card className="w-full bg-defaultGray">
            <CardHeader>
                <CardTitle>Bar Chart - Multiple</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="class"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed"/>}
                        />
                        <Bar dataKey="paid" fill="#f7b696" radius={4}/>
                        <Bar dataKey="remaining" fill="#576086" radius={4}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default FeesChart;