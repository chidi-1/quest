import MapObject from "./mapobject";
import Area from "./area";
import {Landscape} from "./landscape";

export default class Location extends MapObject {
    difficulty: number;
    area: Area;

    constructor(x: number, y: number, radius: number, landscape: Landscape, name: string, difficulty: number) {
        super(x, y, radius, landscape, name);
        this.difficulty = difficulty;
    }
}