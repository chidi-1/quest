export interface WorldAffector {
    doSomething();
}

function isWorldAffector(any: any): any is WorldAffector {
    return (any as WorldAffector).doSomething !== undefined;
}