import { kitOptions} from "../types/User.types";

export let defaultKit: kitOptions = {
    hat: {
        baseLayer: [],
        outerLayer: [
            {
                label: "Helmet",
                id: 0,
                tempMin: -20,
                tempMax: 40,
            },
        ],
        overLayer: [],
    },
    torso: {
        baseLayer: [
            {
                label: "warm Baselayer",
                id: 0,
                tempMin: -10, 
                tempMax: 15,
            },
        ],
        outerLayer: [
            {
                label: "Long Sleeve Jersey",
                id: 0,
                tempMin: -10,
                tempMax: 10,
            },
            {
                label: "Short Sleeve Jersey",
                id: 1,
                tempMin: 10,
                tempMax: 40,
            },
        ],
        overLayer: [
            {
                label: "Rain Jacket",
                id: 0,
                tempMin: 0,
                tempMax: 0,
                waterResistance: false,
            },
        ], // Rain Jacket
    },
    legs: {
        baseLayer: [],
        outerLayer: [
            {
                label: "Warm Bib Tights",
                id: 0,
                tempMin: -10,
                tempMax: 10,
            },
            {
                label: "Bib Shorts",
                id: 1,
                tempMin: 10,
                tempMax: 40,
            },
        ],
        overLayer: [],
    },
    feet: {
        baseLayer: [
            {
                label: "Warm socks",
                id: 0,
                tempMin: -10,
                tempMax: 15,
            },
            {
                label: "light socks",
                id: 1,
                tempMin: 15,
                tempMax: 40,
            },
        ],
        outerLayer: [
            {
                label: "Cycling Shoes",
                id: 0,
                tempMin: 0,
                tempMax: 0,
            },
        ],
        overLayer: [
            {
                label: "Overshoes",
                id: 0,
                tempMin: -10,
                tempMax: 10,
            },
        ],
    },
    hands: {
        baseLayer: [],
        outerLayer: [
            {
                label: "No gloves",
                id: 0,
                tempMin: -10,
                tempMax: 10,
            },
            {
                label: "Gloves",
                id: 0,
                tempMin: -10,
                tempMax: 10,
            },
        ],
        overLayer: [],
    },
};
