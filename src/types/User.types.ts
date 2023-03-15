// Is this overcomplicating it? depends on format of DB
export type User = {
    hat: LayerOptions;
    torso: LayerOptions;
    legs: LayerOptions;
    feet: LayerOptions;
    hands: LayerOptions;
};

export type LayerOptions = {
    baseLayer: Kit[];
    outerLayer: Kit[];
    overLayer: Kit[];
};

//** Return type of main kit selection function */
export type KitSelection = {
    hat: Layers;
    torso: Layers;
    legs: Layers;
    feet: Layers;
    hands: Layers;
};

export type Layers = {
    baseLayer: Kit | null;
    //** Must have a top */
    top: Kit;
    external: Kit | null;
};

//** User owns kit */
export type Kit = {
    label: string;
    id: number | null;
    tempMin: number;
    tempMax: number;
    waterResistance?: WaterResistance;
    layerPos?: LayerPos;
    layerType: LayerType;
    adjustments: FeedBack[];
};

export enum WaterResistance {
    none,
    resistant,
    high,
}

export enum FeedBack {
    tooHot,
    ok,
    tooCold,
    tooWet,
}

//** Defines where the kit is placed */
export enum LayerPos {
    hat,
    torso,
    legs,
    feet,
}

//** Defines what layers can be used together */
export enum LayerType {
    //** Rain jackets, gillets, windproof layers, Overshoes */
    external,
    //** Jerseys, bibs */
    top,
    //** Thermals, Socks, Leg warmers? */
    base,
    any,
}
