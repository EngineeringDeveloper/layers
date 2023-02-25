import { OpenWeather } from "../helpers/weather.enum";
import { OpenWeatherCurrentResponse } from "../types/OpenWeather.types";

interface WeatherParams {
  lat: number;
  lon: number;
}
export async function retrieveCurrentWeather(
  weatherParams: WeatherParams
): Promise<OpenWeatherCurrentResponse> {
  const response = await fetch(
    `${OpenWeather.current}lat=${weatherParams.lat}&lon=${
      weatherParams.lon
    }&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_TOKEN}`
  );
  const body = await response.json();
  return body;
}
