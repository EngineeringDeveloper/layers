// Is this overcomplicating it? depends on format of DB
export type kitOptions = {
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

export type LayerSelection = {
    baseLayer: Kit | null;
    outerLayer: Kit;
    overLayer: Kit | null;
};

//** Return type of main kit selection function */
export type KitSelection = {
    hat: LayerSelection;
    torso: LayerSelection;
    legs: LayerSelection;
    feet: LayerSelection;
    hands: LayerSelection;
};

//** User owns kit */
export type Kit = {
    label: string;
    id: number | null;
    tempMin: number;
    tempMax: number;
    waterResistance?: boolean;
    // layerPos?: LayerPos;
    // layerType: LayerType;
    // adjustments: FeedBack[];
};
