import {RewardType} from "./reward";
import {Landscape} from "../Geo/landscape";

abstract class Creature {
    name: string;
    alignment: Alignment;
    type: Type;
}

enum Alignment {
    good,
    neutral,
    evil
}
enum Type {
    human,
    animal,
    undead,
}

export default class EnemyType extends Creature {
    difficulty: number;
    landscape: Landscape;
    reward: Array<RewardType>;

    constructor(name: string, difficulty: number, landscape: Landscape, ...reward:RewardType[]) {
        super();
        this.name = name;
        this.difficulty = difficulty;
        this.landscape = landscape;
        this.reward = reward;
    }
}