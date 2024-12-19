import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart.tsx";

const chartConfig = {
    count: {
        label: "Count",
    },
    Male: {
        label: "Male",
        color: "hsl(var(--chart-male))",
    },
    Female: {
        label: "Female",
        color: "hsl(var(--chart-female))",
    },
} satisfies ChartConfig;

type GenderChartProps = {
    malePercentage: number;
    femalePercentage: number;
}

export function GenderChart({malePercentage, femalePercentage}: GenderChartProps) {
    const chartData = [
        { gender: "Male", count: malePercentage, fill: "#F7B696" },
        { gender: "Female", count: femalePercentage, fill: "#576086" },
    ];

    return (
        <Card className="w-full flex flex-col border-none shadow-none rounded-2xl bg-defaultGray">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-2xl font-bold text-defaultBlue">Students</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="gender"
                            innerRadius={50}
                            outerRadius={120}
                            strokeWidth={5}
                            startAngle={90}
                            endAngle={450}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className=""
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0)}
                                                    className="fill-muted-foreground text-xs font-semibold"
                                                >
                                                    Gender Ratio
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-center gap-12 text-sm">
                <div className="flex-col gap-2">
                    <span className="flex gap-2">
                        <img src="/icons/male.png" alt="male"/>
                        <p className="font-normal text-base capitalize">male</p>
                    </span>
                    <p className="text-xl font-bold">{malePercentage}%</p>
                </div>
                <div className="flex-col gap-2">
                    <span className="flex gap-2">
                        <img src="/icons/female.png" alt="female"/>
                        <p className="font-normal text-base capitalize">female</p>
                    </span>
                    <p className="text-xl font-bold">{femalePercentage}%</p>
                </div>
            </CardFooter>
        </Card>
    )
}

export default GenderChart;