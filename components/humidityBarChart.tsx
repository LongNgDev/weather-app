"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from "recharts";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "./ui/chart";
import { WeatherData } from "@/app/data/dummy-5days";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function HumidityBarChart({ data }: { data: WeatherData["list"] }) {
	const chartData = data.map((item) => {
		return {
			hr: new Date(item.dt * 1000).toLocaleTimeString("en-AU", {
				hour: "2-digit",
				hour12: false,
			}),
			humidity: item.main.humidity,
		};
	});

	const chartConfig = {
		humidity: {
			label: "Humidity",
			color: "var(--chart-2)",
		},
	} satisfies ChartConfig;

	return (
		<Card className="w-full border-2 bg-background rounded-xl">
			<CardHeader>
				<CardTitle>Humidity Chart</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="w-full h-[250px] ">
					<BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
						<XAxis
							dataKey={"hr"}
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>

						<YAxis
							dataKey={"humidity"}
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							label={{ value: "%", position: "insideLeft" }}
						/>
						<CartesianGrid vertical={false} />
						<Bar dataKey="humidity" fill="var(--color-humidity)" radius={4}>
							<LabelList
								dataKey={"humidity"}
								position={"top"}
								offset={8}
								fontSize={12}
								className="fill-foreground"
							/>
						</Bar>
						{/* <ChartTooltip
							content={<ChartTooltipContent hideLabel indicator="line" />}
							cursor={false}
						/> */}
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

export default HumidityBarChart;
