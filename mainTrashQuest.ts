import Location from "./location";

export default class MainTrashQuest {
    // get historyTravel(): Array<Location> {
    //     return this._historyTravel;
    // }

    private historyTravel: Array<Location>;
    private currentPosition: Location;

    setLocation(location: Location):void {
        this.historyTravel.push(location);
        this.currentPosition = location;
    }
}

