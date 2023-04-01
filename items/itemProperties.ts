import {WorldAffector} from "../interfaces";
import {getRandomElement, randn_bm} from "../utils";
import {ItemProperty, ItemPropertyValue, ItemPropertyRender} from "../properties/core";
import {generateAttributes} from "./itemType";



class ItemPropertySimple extends ItemProperty {
    constructor(name: string) {
        super();
        this.name = name;
    }

    createValue(): ItemPropertyRender {
        let number = randn_bm(0, 1, 1.5);
        return new NumberPropertyRender(number);
    }
}

class ItemPropertySimpleNamed extends ItemProperty {
    namesRange: { [name: number]: string };

    constructor(name: string, namesRange: { [name: number]: string }) {
        super();
        this.name = name;
        this.namesRange = namesRange;
    }

    createValue(): ItemPropertyRender {
        let number = randn_bm(0, 1, 1.5)
        return new NumberRangesPropertyRender(number, this.namesRange);
    }
}

class ItemPropertySimpleRandomNest extends ItemProperty {
    nestAttrs: ItemProperty[];

    constructor(name: string, nestAttrs: ItemProperty[]) {
        super();
        this.name = name;
        this.nestAttrs = nestAttrs;
    }

    createValue(): ItemPropertyRender {
        var attributes = generateAttributes(this.nestAttrs,1);
        return new NestedPropertyRender(attributes)
    }
}

class ItemPropertyList extends ItemProperty {
    list: string[];

    constructor(name: string, list: string[]) {
        super();
        this.name = name;
        this.list = list;
    }

    createValue(): ItemPropertyRender {
        let item = getRandomElement(this.list);
        return new StringPropertyRender(item);
    }
}

class ItemPropertyAccess extends ItemProperty implements WorldAffector {
    doSomething() {
    }

    createValue(): ItemPropertyRender {
        return undefined;
    }
}

let strength = new ItemPropertySimpleNamed("Сила", {0.75: "+3", 0.95: "+2", 1: "+1"})
let agility = new ItemPropertySimpleNamed("Ловкость", {0.75: "+3", 0.95: "+2", 1: "+1"})
let stamina = new ItemPropertySimpleNamed("Выносливость", {0.75: "+3", 0.95: "+2", 1: "+1"})
let inellect = new ItemPropertySimpleNamed("Интеллект", {0.75: "+3", 0.95: "+2", 1: "+1"})
let wisdom = new ItemPropertySimpleNamed("Мудрость", {0.75: "+3", 0.95: "+2", 1: "+1"})
let charisma = new ItemPropertySimpleNamed("Харизма", {0.75: "+3", 0.95: "+2", 1: "+1"})

export const PROPERTIES: Array<ItemProperty> = [
    new ItemPropertySimpleNamed('', {0.75: "дорогой", 0.95: "обычный", 1: "дешевый"}), //дорогой
    new ItemPropertySimpleNamed('', {0.75: "уникальный", 0.95: "редкий", 1: "обычный"}), //уникальный
    new ItemPropertySimpleNamed('', {0.75: "древний", 0.95: "старый", 1: "современный"}), //исторический
    new ItemPropertySimpleNamed('', {0.75: "королевский", 0.95: "купеческий", 1: "крестьянский"}), //статусный
    new ItemPropertySimpleRandomNest('бонус к хар-ке ', [strength, agility, stamina,inellect,wisdom,charisma]),
    new ItemPropertyList('магическое свойство: ', ['блестящий', 'пахнущий ландышем']),
    new ItemPropertyList('проклятое: ', ['меняет пол', 'заикание']),
]

class NumberPropertyRender extends ItemPropertyRender {
    number: number;

    constructor(number: number) {
        super();
        this.number = number;
    }

    asString() {
        return this.number.toString();
    }
}

class StringPropertyRender extends ItemPropertyRender {
    string: string;

    constructor(string: string) {
        super();
        this.string = string;
    }

    asString() {
        return this.string;
    }
}

class NumberRangesPropertyRender extends ItemPropertyRender {
    number: number;
    names: { [name: number]: string }

    constructor(number: number, names: { [name: number]: string }) {
        super();
        this.number = number;
        this.names = names;
    }

    asString() {
        for (const namesKey in this.names) {
            if (this.number <= +namesKey) {
                return this.names[namesKey]
            }
        }
    }
}

class NestedPropertyRender extends ItemPropertyRender {
    attributes: ItemPropertyValue[];

    constructor(attribute: ItemPropertyValue[]) {
        super();
        this.attributes = attribute;
    }

    asString(): string {
        let text="";
        for (const attributeValue of this.attributes) {
            text+=`${attributeValue.property.name}:${attributeValue.value.asString()};`
        }
        return  text;
    }
}




