"use server";

import { WeatherData } from "@/app/data/dummy-5days";
// import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

/* const redis = Redis.fromEnv();

const TTL = 300; // 300 for 5mins */

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const lat = searchParams.get("lat");
	const lon = searchParams.get("lon");
	// const key = `${lat}:${lon}:current`;
	const appid = process.env.WEATHER_KEY;

	if (!lat || !lon)
		return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });

	// Check cache
	// const cached = await redis.get(key);
	// if (cached) return NextResponse.json(cached);

	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`,
		{ next: { revalidate: 300 } }
	);

	if (!res.ok)
		return NextResponse.json({ error: "API request failed" }, { status: 500 });

	const data: WeatherData = await res.json();

	// await redis.setex(key, TTL, data);

	return NextResponse.json(data);
}
