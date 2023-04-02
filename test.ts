interface WheelCarrier{
    countWheels():number;
}

class Car implements WheelCarrier{
    countWheels(): number {
        return 5;
    }

}

class DrugDealer implements WheelCarrier{
    countWheels(): number {
        return 100;
    }
}

function displayWheels(wheelCarrier:WheelCarrier){
    console.log(wheelCarrier.countWheels())
}

var car = new Car()
var drugDealer = new DrugDealer();

displayWheels(car)
displayWheels(drugDealer)