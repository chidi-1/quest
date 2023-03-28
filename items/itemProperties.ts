import {WorldAffector} from "../interfaces";
import {randn_bm} from "../utils";
import {generateAttributes} from "./itemType";

export abstract class ItemProperty {
    name: string;

    abstract createValue(): ItemPropertyValue;
}

class ItemPropertySimple extends ItemProperty {
    constructor(name: string) {
        super();
        this.name = name;
    }

    createValue(): ItemPropertyValue {
        let number = randn_bm(0, 1, 1.5);
        return new NumberPropertyValue(number);
    }
}

class ItemPropertySimpleNamed extends ItemProperty {
    namesRange: { [name: number]: string };

    constructor(name: string, namesRange: { [name: number]: string }) {
        super();
        this.name = name;
        this.namesRange = namesRange;
    }

    createValue(): ItemPropertyValue {
        let number = randn_bm(0, 1, 1.5)
        return new NumberNamesPropertyValue(number, this.namesRange);
    }
}

class ItemPropertySimpleRandomNest extends ItemProperty {
    nestAttrs: ItemProperty[];

    constructor(name: string, nestAttrs: ItemProperty[]) {
        super();
        this.name = name;
        this.nestAttrs = nestAttrs;
    }

    createValue(): ItemPropertyValue {
        var attributes = generateAttributes(this.nestAttrs,1);
        // let attribute = this.nestAttrs[Math.ceil(Math.random() * this.nestAttrs.length) - 1]
        // let value = randn_bm(0, 1, 1.5)
        let text="";
        for (const attributeValue of attributes) {
            text+=`${attributeValue.property.name}:${attributeValue.value.asString()};`
        }
        return new StringPropertyValue(text);
    }
}

class ItemPropertyList extends ItemProperty {
    list: string[];

    constructor(name: string, list: string[]) {
        super();
        this.name = name;
        this.list = list;
    }

    createValue(): ItemPropertyValue {
        let item = this.list[Math.ceil(Math.random() * this.list.length) - 1]
        return new StringPropertyValue(item);
    }
}

class ItemPropertyAccess extends ItemProperty implements WorldAffector {
    doSomething() {
    }

    createValue(): ItemPropertyValue {
        return undefined;
    }
}

let power = new ItemPropertySimple("Power")
let agility = new ItemPropertySimple("Agility")
let spirit = new ItemPropertySimple("Spirit")

export const PROPERTIES: Array<ItemProperty> = [
    new ItemPropertySimpleNamed('дорогой', {0.5: "дешевый", 0.8: "обычный", 1: "дорогой"}),
    new ItemPropertySimple('уникальный'),
    new ItemPropertySimple('исторический'),
    new ItemPropertySimple('статусный'),
    new ItemPropertySimpleRandomNest('бонус к хар-ке', [power, agility, spirit]),
    new ItemPropertySimpleRandomNest('бонус к хар-ке', [power, agility, spirit]),
    new ItemPropertySimpleRandomNest('бонус к хар-ке', [power, agility, spirit]),
    new ItemPropertySimpleRandomNest('бонус к хар-ке', [power, agility, spirit]),
    new ItemPropertySimpleRandomNest('бонус к хар-ке', [power, agility, spirit]),
    new ItemPropertySimpleRandomNest('бонус к хар-ке', [power, agility, spirit]),
    new ItemPropertyList('магическое свойств ', ['блестящий', 'пахнущий ландышем']),
]

//const FUNMAGIC = new ItemPropertySimple('обладающий свойством ');

export abstract class ItemPropertyValue {
    abstract asString(): string;
}

class NumberPropertyValue extends ItemPropertyValue {
    number: number;

    constructor(number: number) {
        super();
        this.number = number;
    }

    asString() {
        return this.number.toString();
    }
}

class StringPropertyValue extends ItemPropertyValue {
    string: string;

    constructor(string: string) {
        super();
        this.string = string;
    }

    asString() {
        return this.string;
    }
}

class NumberNamesPropertyValue extends ItemPropertyValue {
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




