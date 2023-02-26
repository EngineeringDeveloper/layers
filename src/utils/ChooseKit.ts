import type { OpenWeatherCurrentResponse } from "../types/OpenWeather.types";
import {
    Kit,
    KitSelection,
    LayerOptions,
    LayerType,
    User,
} from "../types/User.types";

const defaultNoSelection: Kit = {
    label: "",
    id: null,
    tempMin: 0,
    tempMax: 0,
    waterResistance: 0,
    layerType: LayerType.any,
};

export async function selectKit(
    weather: OpenWeatherCurrentResponse,
    user: User
): Promise<KitSelection> {
    const tempMax = weather.main.temp_max;
    const tempMin = weather.main.temp_min;
    const feeslLike = weather.main.feels_like;
    // const rainChance = weather

    // find a kit combination which satisfies the minimum and maximum temperature
    const kitSelection = Object.entries(user).reduce<KitSelection>(
        (selection, currentLayer) => {
            const [layerPos, layerOptions] = currentLayer;
            const combi = cartesian(
                layerOptions.top,
                // Because baseLayer and external are optional
                [...layerOptions.baseLayer, defaultNoSelection],
                [...layerOptions.external, defaultNoSelection]
            );

            // find the min and max temperature ranges

            // check the combinations against the Weather

            // set the selection
            // How to make TS happy with this index?
            selection[layerPos] = {};

            return selection;
        },
        {
            hat: undefined,
            torso: undefined,
            legs: undefined,
            feet: undefined,
            hands: undefined,
        }
    );
    return kitSelection;
}

//** X products arrays to get all the combinations */
const cartesian = (...a: any[]): any[][] =>
    a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
