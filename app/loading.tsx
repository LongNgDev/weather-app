"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
	return (
		<div className="w-full h-dvh flex justify-center items-center">
			<div className="w-2xl">
				<DotLottieReact
					src="/Loading.lottie"
					loop
					autoplay
					speed={0.5}
					className=""
				/>
			</div>
		</div>
	);
}
