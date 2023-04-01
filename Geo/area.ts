import MapObject from "./mapobject";
import Location from "./location";
import {Landscape} from "./landscape";

export default class Area extends MapObject {
    difficulty: number;
    locations: Array<Location>;

    constructor(x: number, y: number, radius: number, landscape: Landscape, name: string, difficulty: number) {
        super(x, y, radius, landscape, name);
        this.difficulty = difficulty;
        this.locations = [];
    }

    addLocation(...location:Location[]):void {
        for (const item in location) {
            this.locations.push(location[item]);
            location[item].area = this;
        }
    }
}

