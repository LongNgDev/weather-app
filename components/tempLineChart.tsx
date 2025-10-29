"use client";

import { WeatherData } from "../app/data/dummy-5days";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

function TempLineChart({ data }: { data: WeatherData["list"] }) {
	const chartConfig = {
		temp: {
			color: "var(--chart-2)",
		},
	} satisfies ChartConfig;

	const chartData = data.map((item) => {
		return {
			hr: new Date(item.dt * 1000).toLocaleTimeString("en-AU", {
				hour: "2-digit",
				hour12: false,
			}),
			temp: Math.round(item.main.temp),
		};
	});

	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Temperature Chart</CardTitle>
				<CardDescription>30 December 2025</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full py-4"
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
							// axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
							label={"temp"}
						/>
						<YAxis dataKey={"temp"} tickLine={false} tickMargin={8} />
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
