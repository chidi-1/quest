import MainTrashQuest from "./mainTrashQuest";

abstract class Step {
    abstract description: string;
    static isFirst: boolean = false;
    constructor(quest: MainTrashQuest) {
    }
}

class StepTravel extends Step {
    description: string = "встань и иди в";
    static isFirst = true;
    constructor(quest: MainTrashQuest) {
        super(quest);
    }
}

class StepDialog extends Step {
    description: string = "поговорить";
    isFirst: boolean;
    constructor(quest: MainTrashQuest) {
        super(quest);
    }
}

let steps: Array<any> = [StepTravel, StepDialog]
let chain: Array<Step> = [];
let mainQuest = new MainTrashQuest();

while (chain.length < 1){
    let index = Math.ceil(Math.random() * steps.length);
    if(steps[index-1].isFirst){
        chain.push(new steps[index-1](mainQuest))
    }
}

for (let i = 0; i < 3; i++) {
    let index = Math.ceil(Math.random() * steps.length);
    chain.push(new steps[index-1](mainQuest))
}

for (var item in steps) {
    // var item: any;
    // item =  new steps[item]())
    // console.log(steps[item].isFirst)
}
