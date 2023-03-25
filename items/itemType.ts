import ItemProperty, {PROPERTIES} from "./itemProperties";
import {randn_bm} from "../utils";

interface ItemPropertyToItem {
    property: ItemProperty
    value: number
}

class Item {
    properties: ItemPropertyToItem[];

    constructor(properties: ItemPropertyToItem[]) {
        this.properties = properties;
    }
}

function generateItem(): Item {
    let properties: ItemPropertyToItem[] = [];
    for (let i = 0; i < Math.ceil(randn_bm(0, 3, 1.5)); i++) {
        let index = Math.ceil(Math.random() * PROPERTIES.length);
        properties.push({
            property: PROPERTIES[index - 1],
            value: randn_bm(0, 1, 1.5)
        })
    }
    return new Item(properties);
}


console.log(generateItem())