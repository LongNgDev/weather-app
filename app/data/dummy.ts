export type CurrentWeatherData = typeof data;

export const data = {
	coord: { lon: 145.0644, lat: -37.6814 },
	weather: [
		{ id: 801, main: "Clouds", description: "few clouds", icon: "02n" },
	],
	base: "stations",
	main: {
		temp: 8.25,
		feels_like: 6.7,
		temp_min: 6.39,
		temp_max: 9.62,
		pressure: 1017,
		humidity: 81,
		sea_level: 1017,
		grnd_level: 1002,
	},
	visibility: 10000,
	wind: { speed: 2.57, deg: 10 },
	clouds: { all: 12 },
	dt: 1761318042,
	sys: {
		type: 2,
		id: 20478,
		country: "AU",
		sunrise: 1761333690,
		sunset: 1761381956,
	},
	timezone: 39600,
	id: 2146827,
	name: "Thomastown",
	cod: 200,
};
