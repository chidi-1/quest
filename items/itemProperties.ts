import {WorldAffector} from "../interfaces";
import {randn_bm} from "../utils";
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
        let item = this.list[Math.ceil(Math.random() * this.list.length) - 1]
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

let power = new ItemPropertySimple("Power")
let agility = new ItemPropertySimple("Agility")
let spirit = new ItemPropertySimple("Spirit")

export const PROPERTIES: Array<ItemProperty> = [
    new ItemPropertySimpleNamed('дорогой', {0.5: "дешевый", 0.8: "обычный", 1: "дорогой"}),
    new ItemPropertySimple('уникальный'),
    new ItemPropertySimple('исторический'),
    new ItemPropertySimple('статусный'),
    new ItemPropertySimpleRandomNest('бонус к хар-ке', [power, agility, spirit]),
    new ItemPropertyList('магическое свойств ', ['блестящий', 'пахнущий ландышем']),
    new ItemPropertyList('проклятое ', ['меняет пол', 'заикание']),
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




