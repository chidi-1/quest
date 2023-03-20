import Area from "./area";
import {Landscape} from "./landscape";
import Location from "./location";

const ARKTIKA = new Area(5,5,5,Landscape.icedesert,'arktika',3)
const ANTARKTIKA = new Area(15,5,5,Landscape.icedesert,'antarktika',3)

const CAVE_BEAR = new Location(3,3,1,Landscape.cave,'bear',2)
const CAVE_PENGUIN = new Location(14,6,1,Landscape.cave,'penguin',1)

ARKTIKA.addLocation(CAVE_BEAR)
ANTARKTIKA.addLocation(CAVE_PENGUIN)

export const AREAS: Array<Area> = [
    ARKTIKA,
    ANTARKTIKA
]