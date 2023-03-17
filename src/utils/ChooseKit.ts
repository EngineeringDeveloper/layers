import type { OpenWeatherOneCallResponse } from "../types/OpenWeather.types";
import {
    Kit,
    KitSelection,
    LayerOptions,
    kitOptions,
} from "../types/User.types";

export async function selectKit(
    weather: OpenWeatherOneCallResponse,
    user: kitOptions
): Promise<KitSelection> {
    const temps = [weather.hourly[0].temp, weather.hourly[3].temp]
    const tempMax = temps[0] > temps[1]? temps[0]: temps[1];
    const tempMin = temps[0] < temps[1]? temps[0]: temps[1];
    // const feeslLike = weather.main.feels_like;

    // TODO User adjusted Rain Tolerance?
    const rainChance = weather.daily[0].rain !== undefined?weather.daily[0].rain > 0.2: false

    // for each object in kitOptions
    // find a kit combination which satisfies the minimum and maximum temperature
    const kitSelection = Object.fromEntries(
        Object.entries(user).map((currentLayer) => {
            const [layerPos, layerOptions] = currentLayer;
            const best = pickBest(layerOptions, tempMax, tempMin, rainChance);
            return [layerPos, best];
        })
    ) as KitSelection;

    return kitSelection;
}

function pickBest(
    options: LayerOptions,
    tempMax: number,
    tempMin: number,
    rainChance: boolean
) {
    const comboOptions = cartesianSelection(options) as [Kit, Kit, Kit][];

    // want at least the min temp to be exceeded
    const minTempOptions = minTemps(comboOptions);
    const minFilteredOptions = comboOptions.filter((_, index) => {
        return minTempOptions[index] > tempMin;
    });

    // TODO Check for Rain - Should this overide the maxTemp?
    let rainFilteredOptions;
    if (rainChance) {
        rainFilteredOptions = minFilteredOptions.filter((kitSet) => {
            // either the Top or External Kit must have suitable weather resistance
            return (
                kitSet.some(x => {
                    if (x == null) {
                        return false
                    }
                    return x.waterResistance
                })
            );
        });

        if (rainFilteredOptions.length == 0) {
            // No kit options have water resistance?
            console.log("Rain Chance",rainChance , comboOptions, "none have waterResistance")
            rainFilteredOptions = minFilteredOptions
        }
    } else {
        rainFilteredOptions = minFilteredOptions
    }

    // can the maxTemp be < the tempMax
    const maxTempOptions = maxTemps(minFilteredOptions);
    const maxMinFilteredOptions = rainFilteredOptions.filter((_, index) => {
        return maxTempOptions[index] < tempMax;
    });

    // TODO Check for feels like?

    let top;
    let baseLayer;
    let external;

    switch (maxMinFilteredOptions.length) {
        case 0:
            console.error("No kit options satisfied min and Max Requirements");
            if (minFilteredOptions.length > 0) {
                console.log(
                    "Selecting first kit options which satisfy the min temp requirements"
                );
                top = minFilteredOptions[0][0];
                baseLayer = minFilteredOptions[0][1];
                external = minFilteredOptions[0][2];
            } else {
                console.warn("No Appropriate Kit was found");
                return null;
            }
            break;
        case 1:
            top = maxMinFilteredOptions[0][0];
            baseLayer = maxMinFilteredOptions[0][1];
            external = maxMinFilteredOptions[0][2];
            break;

        default:
            // TODO Decide how to pick between multiple options
            top = minFilteredOptions[0][0];
            baseLayer = minFilteredOptions[0][1];
            external = minFilteredOptions[0][2];
            break;
    }

    return {
        baseLayer,
        top,
        external,
    };
}

//** Find the Max temp sum of the kit options and return that kit array* /
function maxTemps(options: Kit[][]) {
    return options.map((kitSet) => {
        return kitSet.slice(1, -1).reduce<number>((accum, kit, _) => {
            if (kit === null) {
                return accum
            }
            return accum - kit.tempMax;
        }, kitSet[0].tempMax);
    });
}

//** Find the Min temp sum of the kit options and return that kit array */
function minTemps(options: Kit[][]) {
    return options.map((kitSet) => {
        return kitSet.reduce<number>((accum, kit, _) => {
            if (kit === null) {
                return accum
            }
            return accum + kit.tempMin;
        }, 0);
    });
}

function cartesianSelection(layerOptions: LayerOptions) {
    // return cartesian(
    //     layerOptions.top,
    //     [...layerOptions.baseLayer, defaultNoSelection],
    //     [...layerOptions.external, defaultNoSelection]
    // );
    // FUTURE Use this Generator to reduce overhead, IE not generate all combinations?
    return [
        ...cartesianIterator([
            layerOptions.outerLayer,
            [...layerOptions.baseLayer, null],
            [...layerOptions.overLayer, null],
        ]),
    ];
}

//** X products arrays to get all the combinations as a Generator*/
function* cartesianIterator<T>(items: T[][]): Generator<T[]> {
    const remainder =
        items.length > 1 ? cartesianIterator(items.slice(1)) : [[]];
    for (let r of remainder) for (let h of items.at(0)!) yield [h, ...r];
}
