import { useEffect, useState } from "react";
import { getLocation } from "../../services/location.service";
import { OpenWeatherOneCallResponse } from "../../types/OpenWeather.types";
import { oneCallWeather } from "../../utils/RetrieveWeather";
import { defaultKit } from "../../assets/database";
import { selectKit, simpleWeather, SimpleWeather } from "../../utils/ChooseKit";
import { kitOptions, KitSelection } from "../../types/User.types";

type WeatherDetails = {
    lon: number;
    lat: number;
};
export const WeatherSetup = (props: kitOptions) => {
    
    const [weatherInfo, setWeatherInfo] = useState<WeatherDetails>({
        lon: 0,
        lat: 0,
    });
    const [weatherResponse, setWeatherResponse] = useState<SimpleWeather>();

    const [kitSelection, setKitSelection] = useState<KitSelection>();

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
                setWeatherResponse(simpleWeather(weatherData));
            };
            getWeatherAndSetState();
        }
    }, [location]);

    return (
        <div className='App'>
            <div>
          <h1>Weather Input:</h1>
          <div><pre>{JSON.stringify(weatherResponse, null, "\t")}</pre></div>
                <button
                    onClick={() => {
                        if (weatherResponse !== undefined) {
                            selectKit(weatherResponse, props).then(
                                (value) => {
                                    setKitSelection(value);
                                }
                            );
                        }
                    }}
                >
                    Choose Kit
                </button>
                <div>
                    <pre>
                        Kit Selection:{" "}
                        {JSON.stringify(kitSelection, null, "\t")}
                    </pre>
                </div>
            </div>
        </div>
    );
};
