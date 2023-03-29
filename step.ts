import MainTrashQuest from "./mainTrashQuest";
import {AREAS} from "./map";
import Location from "./location";
import EnemyType from "./enemy/enemyType";
import {ENEMIES} from "./enemy/bestiary";
import {generateItem} from "./items/itemType";

export abstract class Step {
    abstract description: string;
    static isFirst: boolean = false;
    static canDouble: boolean = false;
    protected quest: MainTrashQuest;

    constructor(quest: MainTrashQuest) {
        this.quest = quest;
    }

    abstract tryGenerateStep(): boolean;
}

export class StepTravel extends Step {
    description: string;
    static isFirst = true;

    tryGenerateStep(): boolean {
        if(this.quest.tryChangeLocation()){
            this.description = `встань и иди в ${this.quest.getCurrentLocation().name}`;
            return true
        }
        return false;
    }
}

export class StepTravelWithPickupItem extends Step {
    description: string;
    static isFirst = true;

    tryGenerateStep(): boolean {
        if(this.quest.tryChangeLocation()){
            let item = generateItem();
            this.description = `встань и иди в ${this.quest.getCurrentLocation().name} и найди ${item.getTextDescription()}`
        }
        return false;
    }

}

export class StepDialog extends Step {
    description: string = "поговорить";
    isFirst: boolean;

    constructor(quest: MainTrashQuest) {
        super(quest);
    }

    tryGenerateStep(): boolean {
        return true;
    }
}

export class StepFight extends Step {
    description: string = "подраться c ";
    isFirst: boolean;

    constructor(quest: MainTrashQuest) {
        super(quest);
    }

    tryGenerateStep(): boolean {
        let allowedEnemies: Array<EnemyType> = [];
        for (const i in ENEMIES) {
            if(ENEMIES[i].landscape == this.quest.getCurrentLocation().landscape && ENEMIES[i].difficulty <= this.quest.questSettings.questDifficulty){
                allowedEnemies.push(ENEMIES[i])
            }
        }
        let enemy = allowedEnemies[Math.ceil(Math.random() * allowedEnemies.length) - 1];
        this.description += enemy.name;

        return true;
    }
}

// свойства
// ценность (дороговизна)
// уникальность
// историческая ценность
// статусность
// масса/габариты + носимый/неносимый
// магическое свойство ???


// скрытая ценность
    // доступ к локации или событию
    // смешное магическое свойство (простое)

// /*личная ценность*/
// юридическая причина (подпараметры)






