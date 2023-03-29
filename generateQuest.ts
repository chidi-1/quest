import MainTrashQuest from "./mainTrashQuest";
import {Step, StepDialog, StepFight, StepTravel, StepTravelWithPickupItem} from "./step";
import QuestSettings from "./questSettings";

let steps: Array<any> = [StepTravel, StepTravelWithPickupItem, StepDialog, StepFight]
let questSettings: QuestSettings = {
    questLength: 5,
    questDifficulty: 1,
    allowedSteps: steps
}
let mainQuest = new MainTrashQuest(questSettings);
mainQuest.generateQuest();

console.log(mainQuest.questDescription)
