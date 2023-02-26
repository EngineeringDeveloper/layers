//** User owns kit */
export type Kit = {
    label: string;
    id: number;
    tempMin: number;
    tempMax: number;
    layerPos: LayerPos;
    layerType: LayerType;
};

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
}
