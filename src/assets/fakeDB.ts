import { User, Kit, LayerType } from "../types/User.types";

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
                top: [
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
                external: [
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
                top: [
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
                external: [
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
                top: [
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
                external: [
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
                top: [
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
                external: [
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
                top: [
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
                external: [
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
