import { OpenWeather } from "../helpers/weather.enum";
import {
  OpenWeatherCurrentResponse,
  OpenWeatherHourlyForecastResponse,
  OpenWeatherOneCallResponse,
} from "../types/OpenWeather.types";

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
  console.log("Body: ", body);
  return body;
}

export async function hourlyWeatherForeacast(
  weatherParams: WeatherParams
): Promise<OpenWeatherHourlyForecastResponse> {
  const response = await fetch(
    `${OpenWeather.hourly}lat=${weatherParams.lat}&lon=${
      weatherParams.lon
    }&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_TOKEN}`
  );
  const body = await response.json();
  console.log("Body: ", body);
  return body;
}

export async function oneCallWeather(
  weatherParams: WeatherParams
): Promise<OpenWeatherOneCallResponse> {
  const response = await fetch(
    `${OpenWeather.onecall}lat=${weatherParams.lat}&lon=${
      weatherParams.lon
    }&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_TOKEN}`
  );
  const body = await response.json();
  console.log("Body: ", body);
  return body;
}
