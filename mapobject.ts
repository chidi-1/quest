import {Landscape} from "./landscape";

export default abstract class MapObject {
    x: number;
    y:number;
    radius: number;
    landscape: Landscape;
    name: string;

    constructor(x: number, y: number, radius: number, landscape: Landscape, name: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.landscape = landscape;
        this.name = name;
    }
}