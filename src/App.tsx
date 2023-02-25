import { useState } from "react";
import "./App.css";
import { retrieveCurrentWeather } from "./utils/RetrieveWeather";
import { OpenWeatherCurrentResponse } from "./types/OpenWeather.types";
type WeatherDetails = {
  lon: number;
  lat: number;
};
function App() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherDetails>({
    lon: 0,
    lat: 0,
  });

  const [weatherResponse, setWeatherResponse] =
    useState<OpenWeatherCurrentResponse>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const returnedData = await retrieveCurrentWeather(weatherInfo);
    setWeatherResponse(returnedData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeatherInfo({ ...weatherInfo, [event.target.name]: event.target.value });
  };

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Lat:
          <input
            type="text"
            name="lat"
            onChange={(e) => handleChange(e)}
            step="any"
          />
        </label>
        <label>
          Lon:
          <input
            type="text"
            name="lon"
            onChange={(e) => handleChange(e)}
            step="any"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {weatherResponse && (
          <div>
            <h1>Weather for {weatherResponse.name}</h1>
            <p>Current Temp: {weatherResponse.main.temp}</p>
            <p>Feels Like: {weatherResponse.main.feels_like}</p>
            <p>Humidity: {weatherResponse.main.humidity}</p>
            <p>Wind Speed: {weatherResponse.wind.speed}</p>
            <p>Wind Direction: {weatherResponse.wind.deg}</p>
            <p>Weather: {weatherResponse.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
