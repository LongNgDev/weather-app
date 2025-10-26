"use client";

import { WeatherData } from "../app/data/dummy-5days";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

function TempLineChart({ data }: { data: WeatherData }) {
	const chartConfig = {
		temp: {
			color: "var(--chart-2)",
		},
	} satisfies ChartConfig;

	const chartData = data.listX.slice(0, 13).map((item) => {
		return {
			hr: new Date(item.dt * 1000).toLocaleTimeString("en-AU", {
				hour: "2-digit",
				timeZone: "UTC",
				hour12: false,
			}),
			temp: item.main.temp,
		};
	});

	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Line Chart</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="hr"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Line
							dataKey="temp"
							type="natural"
							stroke="var(--color-temp)"
							strokeWidth={2}
							dot={true}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

export default TempLineChart;
