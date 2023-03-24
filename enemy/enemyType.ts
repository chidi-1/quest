import {RewardType} from "./reward";
import {Landscape} from "../landscape";

export default class EnemyType {
    name: string
    difficulty: number;
    landscape: Landscape;
    reward: Array<RewardType>;

    constructor(name: string, difficulty: number, landscape: Landscape, ...reward:RewardType[]) {
        this.name = name;
        this.difficulty = difficulty;
        this.landscape = landscape;
        this.reward = reward;
    }
}