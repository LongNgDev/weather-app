"use client";

// import { data } from "@/app/data/dummy-5days";
import HumidityBarChart from "@/components/humidityBarChart";
import TempLineChart from "@/components/tempLineChart";
import Image from "next/image";
import { useEffect, useState } from "react";

import { WeatherData } from "@/app/data/dummy-5days";
import { CurrentWeatherData } from "./data/dummy";
import { MapPin } from "lucide-react";

export default function Home() {
	const [weather, setWeather] = useState<WeatherData>();
	const [currentWeather, setCurWeather] = useState<CurrentWeatherData>();
	const [loading, setLoading] = useState(false);

	const [forecast, setForecast] =
		useState<Record<string, { date: string; max: number; min: number }>>();

	const [time, setTime] = useState("");
	const [date, setDate] = useState("");

	const lat = "-37.81279502930163"; //using current location from GeoAPI
	const lon = "144.91029877590458"; //using current location from GeoAPI
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
			<main className="flex flex-col gap-2 p-4 h-dvh item ">
				{/* Current Weather */}
				<section className="flex flex-col items-center justify-center w-full gap-4 p-6 border-2 border-accent-foreground/60 rounded-2xl">
					<div className="flex flex-col w-full gap-4 ">
						<div className="flex items-center justify-between">
							<div className="flex items-center justify-start gap-8 p-4">
								<div className="flex items-start px-4">
									<h2 className="font-semibold text-8xl">
										{Math.round(currentWeather?.main.temp || 0)}
									</h2>
									<span className="text-4xl ">&deg;C</span>
								</div>
								<div className="flex flex-col justify-center h-full gap-2">
									<span className="text-3xl ">{date}</span>
									<span className="text-2xl">{time}</span>
								</div>
							</div>

							<div className="flex items-center gap-6 p-4 text-5xl font-semibold tracking-wide ">
								<div className="flex items-center gap-2 p-4">
									<div className="relative">
										<MapPin size={38} color="orange" className="" />
									</div>
									<h2>Melbourne</h2>
								</div>

								<div>
									<Image
										src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`}
										width={100}
										height={100}
										alt="icon"
									/>
								</div>
							</div>
						</div>

						{/* Temperature Section */}
						<div className="flex justify-start w-full p-4 overflow-hidden border-2 rounded-xl">
							{DATA.map((data) => {
								return (
									<div
										key={data.dt}
										className="flex flex-col items-center gap-4 p-4 text-xl font-semibold grow not-last:border-r"
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
						<div className="flex flex-col items-center justify-start gap-6 p-4 border-2 rounded-xl h-fit">
							<h3 className="font-semibold">3 Days Forecast</h3>

							<div className="grid w-full text-center auto-rows-auto gap-y-2">
								{forecast ? (
									Object.values(forecast)
										.slice(0, 3)
										.map((item) => {
											return (
												<div
													key={item.date}
													className="grid w-full grid-cols-3 text-center gap-y-2"
												>
													<span className="px-4 text-start">{item.date}</span>
													<span className="px-4 text-muted-foreground">
														{Math.floor(item?.min)}&deg;C
													</span>
													<span className="px-4 ">
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
						<div className="flex flex-col items-center justify-center gap-6 grow">
							<HumidityBarChart data={DATA} />
							<div className="grid w-full grid-cols-3 text-center gap-x-4">
								<div className="flex flex-col border-2 rounded-xl">
									<h3 className="p-4 font-semibold border-b">Humidity (%)</h3>
									<div className="p-4 text-4xl tracking-wide">
										{currentWeather?.main.humidity}
									</div>
								</div>
								<div className="flex flex-col border-2 rounded-xl">
									<h3 className="p-4 font-semibold border-b">
										Wind Speed (km/h)
									</h3>
									<div className="p-4 text-4xl tracking-wide">
										{Math.floor((currentWeather?.wind.speed as number) * 3.6)}
									</div>
								</div>
								<div className="flex flex-col border-2 rounded-xl">
									<h3 className="p-4 font-semibold border-b">Wind Direction</h3>
									<div className="p-4 text-4xl tracking-wide">
										{currentWeather?.wind.deg}&deg;
									</div>
								</div>
							</div>
							<div className="w-full border-2 h-fit rounded-xl">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d402587.5467114705!2d144.72352876621736!3d-37.97210665577302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC!5e0!3m2!1sen!2sau!4v1761784436458!5m2!1sen!2sau"
									width="600"
									height="450"
									className="w-full p-4 border-0 rounded-3xl"
									allowFullScreen={false}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								></iframe>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
