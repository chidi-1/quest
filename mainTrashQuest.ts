import QuestSettings from "./questSettings";

const asc = require('prompt-sync')()
import Location from "./Geo/location";
import {Step} from "./step";
import {AREAS} from "./Geo/map";
import {getRandomElement} from "./utils";

export default class MainTrashQuest {
    // get historyTravel(): Array<Location> {
    //     return this._historyTravel;
    // }

    private historyTravel: Array<Location> = [];
    private currentLocation: Location;

    questSettings: QuestSettings;
    questDescription: string = "";

    constructor(settings: QuestSettings) {
        this.questSettings = settings;
    }

    setLocation(location: Location):void {
        this.historyTravel.push(location);
        this.currentLocation = location;
    }

    getCurrentLocation(): Location {
        return this.currentLocation;
    }

    tryChangeLocation(): boolean {
        let area = getRandomElement(AREAS); // айл би бэк // еще раз
        let location = getRandomElement(area.locations);
        if (location != this.currentLocation) {
            this.setLocation(location);
            return true;
        }
        else {
            return  false
        }
    }

    addStepDescription(stepDescription:string): void{
        this.questDescription += stepDescription;
    }

    generateQuest () {
        let chain: Array<Step> = [];

        while (chain.length < 1) {
            let step = getRandomElement(this.questSettings.allowedSteps);
            if (step.isFirst) {
                chain.push(new step(this))
                chain[0].tryGenerateStep();
                this.addStepDescription(chain[0].description)
            }
        }

        while (chain.length < this.questSettings.questLength) {
            let index = getRandomElement(this.questSettings.allowedSteps);

            if (
                !index.canDouble && (chain[chain.length - 1] instanceof index)
            ) {
                continue;
            }

            let step = new index(this);

            if(step.tryGenerateStep()){
                chain.push(step);
                this.addStepDescription(`, потом ${chain[chain.length-1].description}`)
            }
        }
    }
}
