import { User, Kit, LayerType } from "../types/User.types";


export let defaultKit: User = {
    hat: {
        baseLayer: [],
        outerLayer: [], // Always wear a helmet!
        overLayer: [],
    },
    torso: {
        baseLayer: [], // one base
        outerLayer: [], // long Like a warm perfetto? and short,
        overLayer: [], // Rain Jacket
    },
    legs: {
        baseLayer: [],
        outerLayer: [], // Long bibs and shorts
        overLayer: [],
    },
    feet: {
        baseLayer: [], // warm sock and summer sock
        outerLayer: [], // standard shoe - always picks a sock
        overLayer: [], // overshoes 
    },
    hands: {
        baseLayer: [], 
        outerLayer: [], // gloves or no gloves 
        overLayer: [],
    },
};

// Example of what the database would be like with the current types
export let dataBase = new Map<string, User>([
    [
        "UserA",
        {
            hat: {
                baseLayer: [
                    {
                        label: "baseWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                    {
                        label: "baseHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                ],
                outerLayer: [
                    {
                        label: "topWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                    {
                        label: "topHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                ],
                overLayer: [
                    {
                        label: "externalWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                    {
                        label: "externalHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                ],
            },
            torso: {
                baseLayer: [
                    {
                        label: "baseWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                    {
                        label: "baseHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                ],
                outerLayer: [
                    {
                        label: "topWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                    {
                        label: "topHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                ],
                overLayer: [
                    {
                        label: "externalWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                    {
                        label: "externalHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                ],
            },
            legs: {
                baseLayer: [
                    {
                        label: "baseWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                    {
                        label: "baseHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                ],
                outerLayer: [
                    {
                        label: "topWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                    {
                        label: "topHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                ],
                overLayer: [
                    {
                        label: "externalWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                    {
                        label: "externalHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                ],
            },
            feet: {
                baseLayer: [
                    {
                        label: "baseWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                    {
                        label: "baseHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                ],
                outerLayer: [
                    {
                        label: "topWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                    {
                        label: "topHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                ],
                overLayer: [
                    {
                        label: "externalWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                    {
                        label: "externalHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                ],
            },
            hands: {
                baseLayer: [
                    {
                        label: "baseWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                    {
                        label: "baseHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.base,
                        adjustments: [],
                    },
                ],
                outerLayer: [
                    {
                        label: "topWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                    {
                        label: "topHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.top,
                        adjustments: [],
                    },
                ],
                overLayer: [
                    {
                        label: "externalWarm",
                        id: 0,
                        tempMin: 15,
                        tempMax: 40,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                    {
                        label: "externalHot",
                        id: 1,
                        tempMin: -5,
                        tempMax: 15,
                        layerType: LayerType.external,
                        adjustments: [],
                    },
                ],
            },
        },
    ],
]);
