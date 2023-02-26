// Is this overcomplicating it? depends on format of DB
export type User = {
    hat: LayerOptions;
    torso: LayerOptions;
    legs: LayerOptions;
    feet: LayerOptions;
    hands: LayerOptions;
}

export type LayerOptions = {
    baseLayer: Kit[];
    top: Kit[];
    external: Kit[];
}

//** Return type of main kit selection function */
export type KitSelection = {
    hat: Layers | undefined;
    torso: Layers | undefined;
    legs: Layers | undefined;
    feet: Layers | undefined;
    hands: Layers | undefined;
}

export type Layers = {
    baseLayer: Kit | null;
    //** Must have a top */
    top: Kit;
    external: Kit | null;
}


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
