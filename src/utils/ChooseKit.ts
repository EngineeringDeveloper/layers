import { defaultKit } from "../assets/database";
import type { OpenWeatherOneCallResponse } from "../types/OpenWeather.types";
import {
    Kit,
    KitSelection,
    LayerSelection,
    LayerOptions,
    kitOptions,
} from "../types/User.types";

export interface SimpleWeather {
    tempMax: number;
    tempMin: number;
    rainChance: boolean;
}

export function simpleWeather(
    weather: OpenWeatherOneCallResponse
): SimpleWeather {
    // FUTURE allow adjustment of preferences
    // range of hours, rain tolerance, feelslike
    const temps = weather.hourly.slice(0, 3).map((x) => x.temp);
    const tempMax = temps.reduce((prev, cur) => (cur > prev ? cur : prev));
    const tempMin = temps.reduce((prev, cur) => (cur < prev ? cur : prev));

    const rainChance =
        weather.daily[0].rain !== undefined ? weather.daily[0].rain > 0 : false;
    return { tempMax, tempMin, rainChance };
}

export async function selectKit(
    weather: SimpleWeather,
    userKitOptions: kitOptions
): Promise<KitSelection> {
    const { tempMax, tempMin, rainChance } = weather;

    // if (userKitOptions == defaultKit) {
    console.log("default");
    const basicKit: KitSelection = {
        hat: {
            outerLayer: defaultKit.hat.outerLayer[0],
        },
        torso: {
            outerLayer:
                weather.tempMin < 5
                    ? defaultKit.torso.outerLayer[0]
                    : defaultKit.torso.outerLayer[1],
            baseLayer:
                weather.tempMin < 15 ? defaultKit.torso.baseLayer[0] : null,
            overLayer: weather.rainChance
                ? defaultKit.torso.overLayer[0]
                : null,
        },
        legs: {
            outerLayer:
                weather.tempMin < 10
                    ? defaultKit.legs.outerLayer[0]
                    : defaultKit.legs.outerLayer[1],
        },
        feet: {
            baseLayer:
                weather.tempMin < 10
                    ? defaultKit.feet.outerLayer[0]
                    : defaultKit.feet.outerLayer[1],
            outerLayer: defaultKit.feet.outerLayer[0],
            overLayer: weather.tempMin < 5 || weather.rainChance? defaultKit.feet.overLayer[0]: null 
        },
        hands: {
            outerLayer:
                weather.tempMin < 10
                    ? defaultKit.hands.outerLayer[0]
                    : defaultKit.hands.outerLayer[1],
        },
    };

    return basicKit as KitSelection;
    // }

    // for each object in kitOptions
    // find a kit combination which satisfies the minimum and maximum temperature
    const kitSelection = Object.fromEntries(
        Object.entries(userKitOptions).map((currentLayer) => {
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
    const comboOptions = cartesianIterator(
        options.outerLayer,
        [...options.baseLayer, null],
        [...options.overLayer, null]
    );

    // want at least the min temp to be exceeded
    const minTempOptions = tempDiff(comboOptions, tempMin, "tempMin");
    const maxTempOptions = tempDiff(comboOptions, tempMax, "tempMax");
    const rainOptions = comboOptions.map((kitSet) => {
        // either the Top or External Kit must have suitable weather resistance
        return (
            kitSet.overLayer?.waterResistance ||
            kitSet.outerLayer.waterResistance
        );
    });

    const kitOptions = comboOptions.map((kit, index) => {
        return {
            kit,
            minTemp: minTempOptions[index],
            minTempOK: minTempOptions[index] <= 0,
            maxTemp: maxTempOptions[index],
            maxTempOK: maxTempOptions[index] >= tempMax,
            rainOK: rainOptions[index],
        };
    });

    // return the kit selection that is OK for min max and rain
    // pick the selection that is closest to the min temp
    let layerSelection = kitOptions.reduce((prev, curr) => {
        if (
            curr.minTempOK &&
            curr.maxTempOK &&
            ((rainChance && curr.rainOK) || !rainChance)
        ) {
            if (
                prev.minTempOK &&
                prev.maxTempOK &&
                ((rainChance && prev.rainOK) || !rainChance)
            ) {
                return prev.minTemp > curr.minTemp ? prev : curr;
            }
            return curr;
        }
        return prev;
    });

    return layerSelection.kit;
}

//** Finds the Total difference between the temp prop /
function tempDiff(
    options: LayerSelection[],
    temp: number,
    prop: "tempMin" | "tempMax"
) {
    return options.map((kitSet) => {
        return (
            temp -
            kitSet.outerLayer[prop] +
            (kitSet.baseLayer ? temp - kitSet.baseLayer?.[prop] : 0) +
            (kitSet.overLayer ? temp - kitSet.overLayer?.[prop] : 0)
        );
    });
}

//** X products arrays to get all the combinations as a Generator*/
function cartesianIterator(
    outerLayer: Kit[],
    baseLayer: (Kit | null)[],
    overLayer: (Kit | null)[]
) {
    let cart: LayerSelection[] = [];
    outerLayer.forEach((outer) => {
        baseLayer.forEach((base) => {
            overLayer.forEach((over) => {
                cart.push({
                    outerLayer: outer,
                    baseLayer: base,
                    overLayer: over,
                });
            });
        });
    });
    return cart;
}
