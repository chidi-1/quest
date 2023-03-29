import QuestSettings from "./questSettings";

const asc = require('prompt-sync')()
import Location from "./location";
import {Step} from "./step";
import {AREAS} from "./map";

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
        let area = AREAS[Math.ceil(Math.random() * AREAS.length) - 1]; // айл би бэк // еще раз
        let location = area.locations[Math.ceil(Math.random() * area.locations.length) - 1];
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
            let index = Math.ceil(Math.random() * this.questSettings.allowedSteps.length);
            if (this.questSettings.allowedSteps[index - 1].isFirst) {
                chain.push(new this.questSettings.allowedSteps[index - 1](this))
                chain[0].tryGenerateStep();
                this.addStepDescription(chain[0].description)
            }
        }

        while (chain.length < this.questSettings.questLength) {
            let index = Math.ceil(Math.random() * this.questSettings.allowedSteps.length);

            if (
                !this.questSettings.allowedSteps[index - 1].canDouble && (chain[chain.length - 1] instanceof this.questSettings.allowedSteps[index - 1])
            ) {
                continue;
            }

            let step = new this.questSettings.allowedSteps[index - 1](this);

            if(step.tryGenerateStep()){
                chain.push(step);
                this.addStepDescription(`, потом ${chain[chain.length-1].description}`)
            }
        }
    }
}
