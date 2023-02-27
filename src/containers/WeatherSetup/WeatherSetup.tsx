import { useEffect, useState } from "react";
import { getLocation } from "../../services/location.service";
import { OpenWeatherOneCallResponse } from "../../types/OpenWeather.types";
import { oneCallWeather } from "../../utils/RetrieveWeather";
type WeatherDetails = {
  lon: number;
  lat: number;
};
export const WeatherSetup = () => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherDetails>({
    lon: 0,
    lat: 0,
  });
  const [weatherResponse, setWeatherResponse] =
    useState<OpenWeatherOneCallResponse>();

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const getLocationAndSetState = async () => {
      const userLocation = await getLocation();
      setLocation(userLocation);
    };
    getLocationAndSetState();
  }, []);

  useEffect(() => {
    if (location) {
      const getWeatherAndSetState = async () => {
        const weatherData = await oneCallWeather({
          lat: location.latitude,
          lon: location.longitude,
        });
        setWeatherResponse(weatherData);
      };
      getWeatherAndSetState();
    }
  }, [location]);

  return (
    <div className="App">
      <div>
        <h1>Current Temp: {weatherResponse?.current.temp}</h1>
      </div>
    </div>
  );
};
