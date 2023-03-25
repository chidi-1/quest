import MainTrashQuest from "./mainTrashQuest";
import {AREAS} from "./map";
import Location from "./location";
import EnemyType from "./enemy/enemyType";
import {ENEMIES} from "./enemy/bestiary";

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
    targetLocation: Location;

    constructor(quest: MainTrashQuest) {
        super(quest);
    }

    tryGenerateStep(): boolean {
        let area = AREAS[Math.ceil(Math.random() * AREAS.length) - 1];
        let newLocation = area.locations[Math.ceil(Math.random() * area.locations.length) - 1];
        if(this.quest.getCurrentPosition() != newLocation) {
            this.targetLocation = newLocation;
            this.description = `встань и иди в ${this.targetLocation.name}`;
            this.quest.setLocation(this.targetLocation);
            return true;
        }
        else {
            return false;
        }
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
            if(ENEMIES[i].landscape == this.quest.getCurrentPosition().landscape && ENEMIES[i].difficulty <= this.quest.questSettings.questDifficulty){
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






