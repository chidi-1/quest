import {ItemProperty, PROPERTIES} from "./itemProperties";
import {randn_bm} from "../utils";
import {ItemPropertyValue} from "./itemProperties";

interface ItemPropertyToItem {
    property: ItemProperty
    value: ItemPropertyValue
}

class Item {
    properties: ItemPropertyToItem[];

    constructor(properties: ItemPropertyToItem[]) {
        this.properties = properties;
    }
}

// в локации после драки появились предметы
// добавить параметры в npc на врагов/друзей
// генерация npc с усановкой параметров враждебности

function generateItem(): Item {
    var properties = generateAttributes(PROPERTIES)
    return new Item(properties);
}

export function generateAttributes(allowedProperties: Array<ItemProperty>,max:number=3): ItemPropertyToItem[] {
    let properties: ItemPropertyToItem[] = [];
    for (let i = 0; i < Math.ceil(randn_bm(0, max, 1.5)); i++) {
        let index = Math.ceil(Math.random() * allowedProperties.length);
        properties.push({
            property: allowedProperties[index - 1],
            value: allowedProperties[index - 1].createValue()
        })
    }
    return properties;
}


let item = generateItem();
for (const property of item.properties) {
    console.log(`${property.property.name}: ${property.value.asString()}`)
}