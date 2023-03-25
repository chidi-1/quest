import {WorldAffector} from "../interfaces";

export default abstract class ItemProperty {
    name: string;
}

class ItemPropertySimple extends ItemProperty {
    constructor(name:string) {
        super();
        this.name = name;
    }
}

class ItemPropertyAccess extends ItemProperty implements WorldAffector {
    doSomething() {}
}

export const PROPERTIES: Array<ItemProperty> = [
    new ItemPropertySimple('дорогой'),
    new ItemPropertySimple('уникальный'),
    new ItemPropertySimple('исторический'),
    new ItemPropertySimple('статусный'),
]

//const FUNMAGIC = new ItemPropertySimple('обладающий свойством ');



