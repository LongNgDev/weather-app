import { data } from "@/app/data/dummy-5days";
import TempLineChart from "@/components/tempLineChart";

export default function Home() {
	const DATA = data.listX.slice(0, 13);

	return (
		<div className="min-h-dvh w-dvw max-w-[1440px] m-auto">
			<main className="flex flex-col p-2 h-dvh item gap-2">
				{/* Current Weather */}
				<section className="flex flex-col items-center justify-center w-full border-2 p-4 border-accent-foreground/60 rounded-2xl">
					<div className="flex flex-col w-full">
						<div className="flex justify-around w-full">
							<span>30dg</span>
							<span>21 December 2025</span>
						</div>

						<div className="flex justify-between w-full overflow-hidden ">
							{DATA.map((data) => {
								return (
									<div key={data.dt} className="flex flex-col items-center">
										<span>{data.main.temp}</span>
										<span className="">
											{new Date(data.dt * 1000).toLocaleTimeString(["en-AU"], {
												hour: "2-digit",
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
				<section className="w-full border-2 p-4 border-accent-foreground/60 rounded-2xl">
					<div className="flex w-full">
						<div className="flex flex-col justify-center border-2 rounded-xl items-center p-4">
							<h3>5 Days Forecast</h3>
							<div className="flex">
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30/1
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									18
								</span>
							</div>
							<div className="flex">
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30/1
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									18
								</span>
							</div>
							<div className="flex">
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30/1
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									18
								</span>
							</div>
							<div className="flex">
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30/1
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									18
								</span>
							</div>
							<div className="flex">
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30/1
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									30
								</span>
								<span className="not-last:border-r border-accent-foreground/70 px-2">
									18
								</span>
							</div>
						</div>
						<div className="grow flex flex-col justify-center items-center">
							<div>Rain</div>
							<div className="flex gap-2">
								<div>Humidity</div>
								<div>Wind Speed</div>
								<div>Compass</div>
							</div>
							<div>Location Map Embed</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
