import type { OpenWeatherCurrentResponse } from "../types/OpenWeather.types";
import {
    Kit,
    KitSelection,
    LayerOptions,
    LayerType,
    User,
    WaterResistance,
} from "../types/User.types";

const defaultNoSelection: Kit = {
    label: "",
    id: null,
    tempMin: 0,
    tempMax: 0,
    waterResistance: 0,
    layerType: LayerType.any,
    adjustments: [],
};

export async function selectKit(
    weather: OpenWeatherCurrentResponse,
    user: User
): Promise<KitSelection> {
    const tempMax = weather.main.temp_max;
    const tempMin = weather.main.temp_min;
    const feeslLike = weather.main.feels_like;

    // TODO User adjusted Rain Tolerance?
    const rainChance = weather.rain["1h"] > 0.2? weather.rain["1h"] > 0.5? WaterResistance.high : WaterResistance.resistant : WaterResistance.none


    // for each object in User/KitSelection
    // find a kit combination which satisfies the minimum and maximum temperature
    const kitSelection = Object.fromEntries(Object.entries(user).map((currentLayer) => {
        const [layerPos, layerOptions] = currentLayer;
        const best = pickBest(layerOptions, tempMax, tempMin, rainChance)
        return [layerPos, best]
    })) as KitSelection

    // TODO check for any null selections?

    return kitSelection;
}

function pickBest(options:LayerOptions, tempMax: number, tempMin: number, rainChance: WaterResistance) {
    const torsoOptions = cartesianSelection(options) as [Kit, Kit, Kit][];

    // want at least the min temp to be exceeded
    const minTempOptions = minTemps(torsoOptions);
    const minFilteredOptions = torsoOptions.filter((_, index) => {
        return minTempOptions[index] > tempMin;
    });


    // TODO Check for Rain - Should this overide the maxTemp?
    const rainFilteredOptions = minFilteredOptions.filter((kitSet) => {
        // either the Top or External Kit must have suitable weather resistance
        return kitSet[2].waterResistance == rainChance || kitSet[0].waterResistance == rainChance
    })


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

    // default is No kit not the default kit option
    if (baseLayer == defaultNoSelection) {
        baseLayer = null
    }

    if (external == defaultNoSelection) {
        external = null
    }

    return {
        baseLayer,
        top,
        external,
    }
}

//** Find the Max temp sum of the kit options and return that kit array* /
function maxTemps(options: Kit[][]) {
    // TODO Consider Feedback
    //  How exactly does Max temp work on a kit
    // perfetto = 15 deg
    // Perfetto + Gillet = 10 Deg
    // So top - extras
    return options.map((kitSet) => {
        return kitSet.slice(1, -1).reduce<number>((accum, kit, _) => {
            return accum - kit.tempMax;
        }, kitSet[0].tempMax);
    });
    //.reduce<number>((prev, current, currentIndex, array) => { return array[prev] > current ? prev : currentIndex }, 0)]
}

//** Find the Min temp sum of the kit options and return that kit array */
function minTemps(options: Kit[][]) {
    // TODO Consider Feedback
    return options.map((kitSet) => {
        return kitSet.reduce<number>((accum, kit, _) => {
            return accum + kit.tempMin;
        }, 0);
    });
    //.reduce<number>((prev, current, currentIndex, array) => { return array[prev] < current ? prev : currentIndex }, 0)]
}

function cartesianSelection(layerOptions: LayerOptions) {
    // return cartesian(
    //     layerOptions.top,
    //     [...layerOptions.baseLayer, defaultNoSelection],
    //     [...layerOptions.external, defaultNoSelection]
    // );
    // TODO Use this Generator to reduce overhead, IE not generate all combinations?
    return [...cartesianIterator(
            [layerOptions.top,
            [...layerOptions.baseLayer, defaultNoSelection],
            [...layerOptions.external, defaultNoSelection]]
        )];
}

//** X products arrays to get all the combinations */
// function cartesian<T>(...a: T[][]): T[][] {
//     return a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
// }

//** X products arrays to get all the combinations */
function* cartesianIterator<T>(items: T[][]): Generator<T[]> {
    const remainder = items.length > 1 ? cartesianIterator(items.slice(1)) : [[]];
    for (let r of remainder) for (let h of items.at(0)!) yield [h, ...r];
  }