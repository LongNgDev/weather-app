import { data } from "@/app/data/dummy-5days";
import HumidityBarChart from "@/components/humidityBarChart";
import TempLineChart from "@/components/tempLineChart";
import Image from "next/image";

export default function Home() {
	const DATA = data.listX.slice(0, 13);

	return (
		<div className="min-h-dvh w-dvw max-w-[1440px] m-auto">
			<main className="flex flex-col p-4 h-dvh item gap-2">
				{/* Current Weather */}
				<section className="flex flex-col items-center justify-center w-full border-2 p-6 border-accent-foreground/60 rounded-2xl gap-4">
					<div className="flex flex-col w-full gap-4">
						<div className="flex justify-between items-center w-full p-4">
							<span className="text-7xl font-semibold p-4">30dg</span>
							<span className=" text-4xl">21 December 2025</span>
						</div>

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
												timeZone: "UTC",
											})}
										</span>
									</div>
								);
							})}
						</div>
					</div>
					<div className="w-full">
						<TempLineChart data={data} />
					</div>
				</section>
				<section className="w-full border-2 p-6 border-accent-foreground/60 rounded-2xl">
					<div className="flex w-full gap-6">
						<div className="flex flex-col justify-start border-2 rounded-xl gap-4 items-center p-4 h-fit">
							<h3 className="font-semibold">5 Days Forecast</h3>
							<div className="grid grid-cols-3 auto-rows-auto w-full text-center gap-y-2">
								<span className="not-last:border-r border-accent-foreground/70 px-4 ">
									30/1
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-4">
									30
								</span>
								<span className="px-4">18</span>
								<span className="not-last:border-r border-accent-foreground/70 px-4">
									30/1
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-4">
									30
								</span>
								<span className="px-4">18</span>
							</div>
						</div>
						<div className="grow flex flex-col justify-center items-center gap-6">
							<HumidityBarChart />
							<div className="grid grid-cols-3 text-center w-full gap-x-4">
								<div className=" border-2 rounded-xl flex flex-col">
									<h3 className="font-semibold border-b p-4">Humidity</h3>
									<div className="p-4 text-4xl tracking-wide">30</div>
								</div>
								<div className=" border-2 rounded-xl flex flex-col">
									<h3 className="font-semibold border-b p-4">Wind Speed</h3>
									<div className="p-4 text-4xl tracking-wide">30</div>
								</div>
								<div className=" border-2 rounded-xl flex flex-col">
									<h3 className="font-semibold border-b p-4">Compass</h3>
									<div className="p-4 text-4xl tracking-wide">123</div>
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
