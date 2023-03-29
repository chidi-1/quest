export abstract class ItemPropertyRender {
    abstract asString(): string;
}

export abstract class ItemProperty {
    name: string;
    abstract createValue(): ItemPropertyRender;
}

export interface ItemPropertyValue {
    property: ItemProperty
    value: ItemPropertyRender
}