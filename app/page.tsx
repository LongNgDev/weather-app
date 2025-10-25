import { data } from "@/app/data/dummy-5days";
import TempLineChart from "@/components/tempLineChart";

export default function Home() {
	const DATA = data.listX.slice(0, 13);

	return (
		<div className="min-h-dvh w-dvw max-w-[1440px] m-auto">
			<main className="flex flex-col p-2 h-dvh item">
				<section className="flex flex-col items-center justify-center w-full">
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
				<section>secondary</section>
			</main>
		</div>
	);
}
