import {WorldAffector} from "../interfaces";
import {getRandomElement, randn_bm} from "../utils";
import {
    DefaultRender,
    ItemProperty,
    ItemPropertyRender,
    ItemPropertyValue,
    ItemPropertyValueRender, NoNameRender
} from "../properties/core";
import {generateAttributes} from "./itemType";



class ItemPropertySimple extends ItemProperty {
    constructor(render: ItemPropertyRender, name: string) {
        super(render);
        this.name = name;
    }

    createValue(): ItemPropertyValueRender {
        let number = randn_bm(0, 1, 1.5);
        return new NumberPropertyRender(number);
    }
}

class ItemPropertySimpleNamed extends ItemProperty {
    namesRange: { [name: number]: string };

    constructor(render: ItemPropertyRender, name: string, namesRange: { [name: number]: string }) {
        super(render);
        this.name = name;
        this.namesRange = namesRange;
    }

    createValue(): ItemPropertyValueRender {
        let number = randn_bm(0, 1, 1.5)
        return new NumberRangesPropertyRender(number, this.namesRange);
    }
}

class ItemPropertySimpleRandomNest extends ItemProperty {
    nestAttrs: ItemProperty[];

    constructor(render: ItemPropertyRender, name: string, nestAttrs: ItemProperty[]) {
        super(render);
        this.name = name;
        this.nestAttrs = nestAttrs;
    }

    createValue(): ItemPropertyValueRender {
        let attributes = generateAttributes(this.nestAttrs,1);
        return new NestedPropertyRender(attributes)
    }
}

class ItemPropertyList extends ItemProperty {
    list: string[];

    constructor(render: ItemPropertyRender, name: string, list: string[]) {
        super(render);
        this.name = name;
        this.list = list;
    }

    createValue(): ItemPropertyValueRender {
        let item = getRandomElement(this.list);
        return new StringPropertyRender(item);
    }
}

class ItemPropertyAccess extends ItemProperty implements WorldAffector {
    doSomething() {
    }

    createValue(): ItemPropertyValueRender {
        return undefined;
    }
}

let defaultRender =   new DefaultRender();
let noNameRander = new NoNameRender();

let strength = new ItemPropertySimpleNamed(defaultRender,"Сила", {0.75: "+3", 0.95: "+2", 1: "+1"})
let agility = new ItemPropertySimpleNamed(defaultRender,"Ловкость", {0.75: "+3", 0.95: "+2", 1: "+1"})
let stamina = new ItemPropertySimpleNamed(defaultRender,"Выносливость", {0.75: "+3", 0.95: "+2", 1: "+1"})
let inellect = new ItemPropertySimpleNamed(defaultRender,"Интеллект", {0.75: "+3", 0.95: "+2", 1: "+1"})
let wisdom = new ItemPropertySimpleNamed(defaultRender,"Мудрость", {0.75: "+3", 0.95: "+2", 1: "+1"})
let charisma = new ItemPropertySimpleNamed(defaultRender,"Харизма", {0.75: "+3", 0.95: "+2", 1: "+1"})

export const PROPERTIES: Array<ItemProperty> = [
    new ItemPropertySimpleNamed(noNameRander,'дорогой', {0.75: "дорогой", 0.95: "обычный", 1: "дешевый"}), //дорогой
    new ItemPropertySimpleNamed(noNameRander,'уникальный', {0.75: "уникальный", 0.95: "редкий", 1: "неуникальный"}), //уникальный
    new ItemPropertySimpleNamed(noNameRander,'исторический', {0.75: "древний", 0.95: "старый", 1: "современный"}), //исторический
    new ItemPropertySimpleNamed(noNameRander,'статусный', {0.75: "королевский", 0.95: "жреческий", 1: "крестьянский"}), //статусный
    new ItemPropertySimpleRandomNest(defaultRender, 'бонус', [strength, agility, stamina,inellect,wisdom,charisma]),
    new ItemPropertySimpleRandomNest(defaultRender, 'бонус', [strength, agility, stamina,inellect,wisdom,charisma]),
    new ItemPropertySimpleRandomNest(defaultRender, 'бонус', [strength, agility, stamina,inellect,wisdom,charisma]),
    new ItemPropertySimpleRandomNest(defaultRender, 'бонус', [strength, agility, stamina,inellect,wisdom,charisma]),
    new ItemPropertySimpleRandomNest(defaultRender, 'бонус', [strength, agility, stamina,inellect,wisdom,charisma]),
    new ItemPropertySimpleRandomNest(defaultRender, 'бонус', [strength, agility, stamina,inellect,wisdom,charisma]),
    new ItemPropertySimpleRandomNest(defaultRender, 'бонус', [strength, agility, stamina,inellect,wisdom,charisma]),
    new ItemPropertySimpleRandomNest(defaultRender, 'бонус', [strength, agility, stamina,inellect,wisdom,charisma]),
    new ItemPropertyList(defaultRender,'магическое свойство', ['(поющий)', '(пахнущий ландышем)']),
    new ItemPropertyList(defaultRender,'проклятое', ['(меняет пол)', '(заикание)']),
]

class NumberPropertyRender extends ItemPropertyValueRender {
    number: number;

    constructor(number: number) {
        super();
        this.number = number;
    }

    asString() {
        return this.number.toString();
    }
}

class StringPropertyRender extends ItemPropertyValueRender {
    string: string;

    constructor(string: string) {
        super();
        this.string = string;
    }

    asString() {
        return this.string;
    }
}

class NumberRangesPropertyRender extends ItemPropertyValueRender {
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

class NestedPropertyRender extends ItemPropertyValueRender {
    attributes: ItemPropertyValue[];

    constructor(attribute: ItemPropertyValue[]) {
        super();
        this.attributes = attribute;
    }

    asString(): string {
        let text="";
        for (const attributeValue of this.attributes) {

            text+=attributeValue.property.render.asString(attributeValue.property,attributeValue.value)
        }
        return  text;
    }
}




