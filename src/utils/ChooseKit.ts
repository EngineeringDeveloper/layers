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
    adjustments: []
};

export async function selectKit(
    weather: OpenWeatherCurrentResponse,
    user: User
): Promise<KitSelection> {
    const tempMax = weather.main.temp_max;
    const tempMin = weather.main.temp_min;
    const feeslLike = weather.main.feels_like;
    // const rainChance = weather

    // for each object in KitSelection
    // TODO: Ok to map over or full layout of each attrib?
    // find a kit combination which satisfies the minimum and maximum temperature
    const torsoOptions = cartesianSelection(user.torso)

    // want at least the min temp to be exceeded
    const torsoMinTemps = minTemps(torsoOptions)
    const torsoFilteredOptions = torsoMinTemps.filter((minTemp) => {
        return minTemp > tempMin 
    })

    // can the maxTemp be < the tempMax
    const torsoMaxTemps = maxTemps(torsoFilteredOptions)
    const torsoRemainingOptions = torsoMaxTemps.filter((maxTemp) => {
        return maxTemp < tempMax
    })

    // Check for Rain?

    // Check for feels like?

    // Check for Other

    // const kitSelection = Object.entries(user).reduce<KitSelection>(
    //     (selection, currentLayer) => {
    //         const [layerPos, layerOptions] = currentLayer;
    //         const combi = cartesian(
    //             layerOptions.top,
    //             // Because baseLayer and external are optional
    //             [...layerOptions.baseLayer, defaultNoSelection],
    //             [...layerOptions.external, defaultNoSelection]
    //         );

    //         // find the min and max temperature ranges

    //         // check the combinations against the Weather

    //         // set the selection
    //         // How to make TS happy with this index?
    //         selection[layerPos] = {};

    //         return selection;
    //     },
    //     {
    //         hat: undefined,
    //         torso: undefined,
    //         legs: undefined,
    //         feet: undefined,
    //         hands: undefined,
    //     }
    // );
    // return kitSelection;
}

//** Find the Max temp sum of the kit options and return that kit array* /
function maxTemps(options: Kit[][]) {
    //  How exactly does Max temp work on a kit 
    // perfetto = 15 deg
    // Perfetto + Gillet = 10 Deg 
    // So top - extras
    return options.map((kitSet) => {
        return kitSet.slice(1,-1).reduce<number>((accum, kit, _) => {return accum - kit.tempMax}, kitSet[0].tempMax)
    })
    //.reduce<number>((prev, current, currentIndex, array) => { return array[prev] > current ? prev : currentIndex }, 0)]
}

//** Find the Min temp sum of the kit options and return that kit array */
function minTemps(options: Kit[][]) {
    return options.map((kitSet) => {
        return kitSet.reduce<number>((accum, kit, _) => {return accum + kit.tempMin}, 0)
    })
    //.reduce<number>((prev, current, currentIndex, array) => { return array[prev] < current ? prev : currentIndex }, 0)]
}

function cartesianSelection(layerOptions: LayerOptions) {
    return cartesian(layerOptions.top, [...layerOptions.baseLayer, defaultNoSelection], [...layerOptions.external, defaultNoSelection])
}

//** X products arrays to get all the combinations */
const cartesian = (...a: any[]): any[][] =>
    a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
