"use client";

// import { data } from "@/app/data/dummy-5days";
import HumidityBarChart from "@/components/humidityBarChart";
import TempLineChart from "@/components/tempLineChart";
import Image from "next/image";
import { useEffect, useState } from "react";

import { WeatherData } from "@/app/data/dummy-5days";
import { CurrentWeatherData } from "./data/dummy";

export default function Home() {
	const [weather, setWeather] = useState<WeatherData>();
	const [currentWeather, setCurWeather] = useState<CurrentWeatherData>();
	const [loading, setLoading] = useState(false);

	const [forecast, setForecast] =
		useState<Record<string, { date: string; max: number; min: number }>>();

	const [time, setTime] = useState("");
	const [date, setDate] = useState("");

	const lat = "-37.677284499499244"; //using current location from GeoAPI
	const lon = "145.0641317413585"; //using current location from GeoAPI
	const DATA = weather?.list?.slice(0, 13) ?? [];

	useEffect(() => {
		// if (!weather) return;
		let cur_date = "0";
		const addForecast = () => {
			const DATA_LIST = weather?.list;
			let h_temp = -999;
			let l_temp = 999;

			const res: Record<string, { date: string; max: number; min: number }> =
				{};

			DATA_LIST?.forEach((item) => {
				const item_date = new Date(item.dt * 1000).toLocaleDateString("en-AU", {
					day: "2-digit",
					month: "2-digit",
				});

				if (
					item_date ==
					new Date().toLocaleDateString("en-AU", {
						day: "2-digit",
						month: "2-digit",
					})
				)
					return;

				if (cur_date !== item_date) {
					if (cur_date !== "0") {
						res[item.dt] = {
							date: new Date(item.dt * 1000).toLocaleDateString("en-AU", {
								weekday: "long",
							}),
							max: h_temp,
							min: l_temp,
						};
						h_temp = -999;
						l_temp = 999;
					}
					cur_date = item_date;
				}

				h_temp = Math.max(h_temp, item.main.temp_max);
				l_temp = Math.min(l_temp, item.main.temp_min);
			});
			console.log(res);
			setForecast(res);
		};

		addForecast();
	}, [weather]);

	useEffect(() => {
		async function fetchWeather() {
			setLoading(true);

			try {
				const res = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);
				if (!res.ok) throw new Error("API Error!");

				const data = await res.json();
				setWeather(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		async function fetchCurrenthWeather() {
			setLoading(true);

			try {
				const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
				if (!res.ok) throw new Error("API Error!");

				const data = await res.json();
				setCurWeather(data);

				const cDate = data
					? new Date(data?.dt * 1000).toLocaleDateString("en-AU", {
							dateStyle: "long",
					  })
					: undefined;
				setDate(cDate as string);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		fetchWeather();
		fetchCurrenthWeather();

		const intervalForecast = setInterval(fetchWeather, 300000);
		const intervalWeather = setInterval(fetchCurrenthWeather, 300000);
		return () => {
			clearInterval(intervalForecast);
			clearInterval(intervalWeather);
		};
	}, [lat, lon]);

	useEffect(() => {
		const getTime = () => {
			const cTime = new Date().toLocaleTimeString(["en-AU"], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			});
			setTime(cTime);
		};

		getTime();
		const intervalTime = setInterval(getTime, 1000);

		return () => {
			clearInterval(intervalTime);
		};
	});

	return (
		<div className="min-h-dvh w-dvw max-w-[1440px] m-auto">
			<main className="flex flex-col p-4 h-dvh item gap-2 ">
				{/* Current Weather */}
				<section className="flex flex-col items-center justify-center w-full border-2 p-6 border-accent-foreground/60 rounded-2xl gap-4">
					<div className="flex flex-col w-full gap-4 ">
						<div className="flex justify-start items-start gap-8 w-full p-4">
							<div className="flex items-start px-4">
								<span className="text-8xl font-semibold">
									{Math.round(currentWeather?.main.temp || 0)}
								</span>
								<span className="text-4xl ">&deg;C</span>
							</div>
							<div className="flex flex-col gap-2 justify-center h-full">
								<span className=" text-3xl">{date}</span>
								<span className="text-2xl">{time}</span>
							</div>
						</div>

						{/* Temperature Section */}
						<div className="flex justify-start w-full overflow-hidden p-4 border-2 rounded-xl">
							{DATA.map((data) => {
								return (
									<div
										key={data.dt}
										className="flex flex-col grow not-last:border-r items-center font-semibold text-xl gap-4 p-4"
									>
										<span className="">{Math.round(data.main.temp)}&deg;C</span>
										<Image
											src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
											width={100}
											height={100}
											alt="icon"
										/>
										<span className="text-sm text-muted-foreground">
											{new Date(data.dt * 1000).toLocaleTimeString(["en-AU"], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* Temperature Line Chart Section */}
					<div className="w-full">
						<TempLineChart data={DATA} />
					</div>

					{/* Second Section container */}
					<div className="flex w-full gap-6">
						<div className="flex flex-col justify-start border-2 rounded-xl gap-6 items-center p-4 h-fit">
							<h3 className="font-semibold">3 Days Forecast</h3>

							<div className="grid auto-rows-auto w-full text-center gap-y-2">
								{forecast ? (
									Object.values(forecast)
										.slice(0, 3)
										.map((item) => {
											return (
												<div
													key={item.date}
													className="grid grid-cols-3 w-full text-center gap-y-2"
												>
													<span className=" px-4 text-start">{item.date}</span>
													<span className="px-4 text-muted-foreground">
														{Math.floor(item?.min)}&deg;C
													</span>
													<span className=" px-4">
														{Math.round(item?.max)}&deg;C
													</span>
												</div>
											);
										})
								) : (
									<></>
								)}
							</div>
						</div>
						<div className="grow flex flex-col justify-center items-center gap-6">
							<HumidityBarChart data={DATA} />
							<div className="grid grid-cols-3 text-center w-full gap-x-4">
								<div className=" border-2 rounded-xl flex flex-col">
									<h3 className="font-semibold border-b p-4">Humidity (%)</h3>
									<div className="p-4 text-4xl tracking-wide">
										{currentWeather?.main.humidity}
									</div>
								</div>
								<div className=" border-2 rounded-xl flex flex-col">
									<h3 className="font-semibold border-b p-4">
										Wind Speed (m/s)
									</h3>
									<div className="p-4 text-4xl tracking-wide">
										{currentWeather?.wind.speed}
									</div>
								</div>
								<div className=" border-2 rounded-xl flex flex-col">
									<h3 className="font-semibold border-b p-4">Wind Direction</h3>
									<div className="p-4 text-4xl tracking-wide">
										{currentWeather?.wind.deg}&deg;
									</div>
								</div>
							</div>
							<div className=" h-[200px] w-full border-2 rounded-xl">
								Location Map Embed
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
