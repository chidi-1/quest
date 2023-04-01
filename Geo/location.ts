import MapObject from "./mapobject";
import Area from "./area";
import {Landscape} from "./landscape";

export interface LocationProperties {
    population: number;
}

export default class Location extends MapObject {
    difficulty: number;
    area: Area;
    properties: LocationProperties;

    constructor(x: number, y: number, radius: number, landscape: Landscape, name: string, difficulty: number) {
        super(x, y, radius, landscape, name);
        this.difficulty = difficulty;
    }
}