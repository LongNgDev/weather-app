"use client";

import { WeatherData } from "../app/data/dummy-5days";

import {
	Bar,
	CartesianGrid,
	ComposedChart,
	LabelList,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "recharts";

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
import { useEffect, useState } from "react";

function TempLineChart({ data }: { data: WeatherData["list"] }) {
	const [minTemp, setMinTemp] = useState<number>(0);
	const [maxTemp, setMaxTemp] = useState<number>(0);
	const buffer = 1;

	useEffect(() => {
		const setTemp = () => {
			const min = Math.floor(Math.min(...data.map((d) => d.main.temp)));
			const max = Math.round(Math.max(...data.map((d) => d.main.temp)));
			setMinTemp(min);
			setMaxTemp(max);
		};

		setTemp();
	}, [data]);

	const chartConfig = {
		temp: {
			color: "var(--chart-2)",
		},
		rain: {
			color: "var(--chart-3)",
		},
	} satisfies ChartConfig;

	const chartData = data.map((item) => {
		return {
			hr: new Date(item.dt * 1000).toLocaleTimeString("en-AU", {
				hour: "2-digit",
				hourCycle: "h12",
			}),
			temp: Math.round(item.main.temp),
			rain: item.rain?.["3h"],
		};
	});

	return (
		<Card className="bg-background">
			<CardHeader>
				<CardTitle>Temperature Chart</CardTitle>
				<CardDescription>30 December 2025</CardDescription>
			</CardHeader>
			<CardContent className="px-0 sm:px-4 lg:px-6">
				<ChartContainer config={chartConfig} className=" h-[250px] w-full">
					<ComposedChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
							// top: 12,
							// bottom: 12,
						}}
						className=""
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="hr"
							tickLine={false}
							// axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 5)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
							label={"temp"}
						/>
						<YAxis
							dataKey={"temp"}
							tickLine={false}
							tickMargin={8}
							type="number"
							domain={[minTemp - buffer, maxTemp + buffer]} // little breathing room
							allowDataOverflow={false}
						/>
						<Line
							dataKey="temp"
							type="natural"
							stroke="var(--color-temp)"
							strokeWidth={2}
							dot={true}
						/>
						{/* <Bar
							dataKey={"rain"}
							radius={[4, 4, 0, 0]}
							// fill="var(--color-rain)"
							className="fill-cyan-300/40"
						>
							<LabelList
								dataKey={"rain"}
								position={"center"}
								offset={8}
								fontSize={12}
								className="text-base font-semibold tracking-wide fill-foreground/80"
							/>
						</Bar> */}
					</ComposedChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

export default TempLineChart;
