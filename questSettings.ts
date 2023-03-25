export default interface QuestSettings {
    questLength: number;
    questDifficulty: number;
    allowedSteps: Array<any>;

    // constructor() {
    //     this.questLength = asc("Количество шагов?");
    //     this.questDifficulty = asc("Сложность?");
    // }
}