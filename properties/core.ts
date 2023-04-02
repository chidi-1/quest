export abstract class ItemPropertyValueRender {
    abstract asString(): string;
}

export abstract class ItemProperty {
    name: string;
    render: ItemPropertyRender;
    abstract createValue(): ItemPropertyValueRender;
    constructor(render:ItemPropertyRender) {
        this.render = render;
    }
}

export interface ItemPropertyValue {
    property: ItemProperty
    value: ItemPropertyValueRender
}

export interface ItemPropertyRender {
    asString(property: ItemProperty, value: ItemPropertyValueRender);
}

export class DefaultRender implements ItemPropertyRender{
    asString(property: ItemProperty, value: ItemPropertyValueRender): string {
        return `${property.name}${value.asString()}`
    }
}

export class NoNameRender implements ItemPropertyRender {
    asString(property: ItemProperty, value: ItemPropertyValueRender): string {
        return value.asString();
    }
}
