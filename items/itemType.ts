import {getRandomElement, randn_bm} from "../utils";
import {ItemProperty, ItemPropertyValue} from "../properties/core";
import {PROPERTIES} from "./itemProperties";

class Item {
    properties: ItemPropertyValue[];

    constructor(properties: ItemPropertyValue[]) {
        this.properties = properties;
    }

    getTextDescription(): string {
        let  description = "";
        for (const property of this.properties) {
            description += `${property.property.name} ${property.value.asString()}`
        }
        return description;
    }
}

// функция случайного выбора из массива +
// в локации после драки появились предметы +
// добавить параметры в npc на врагов/друзей
// генерация npc с усановкой параметров враждебности

export function generateItem(): Item {
    var properties = generateAttributes(PROPERTIES)
    return new Item(properties);
}

export function generateAttributes(allowedProperties: Array<ItemProperty>, max: number = 3): ItemPropertyValue[] {
    let properties: ItemPropertyValue[] = [];
    for (let i = 0; i < Math.ceil(randn_bm(0, max, 1.5)); i++) {
        let attribute = getRandomElement(allowedProperties);
        properties.push({
            property: attribute,
            value: attribute.createValue()
        })
    }
    return properties;
}

let item = generateItem();
for (const property of item.properties) {
    //console.log(`${property.property.name}: ${property.value.asString()}`)
}