class Visitor {
    constructor(birthDay = "1.01.2000") {
        this.totalDrinkVolume = 0;
        this._birthDay = birthDay;
    }

    drink(volume) {
        this.totalDrinkVolume += volume;
        return volume;
    }

    sober() {
        this.totalDrinkVolume = 0;
    }

    isTotallyDrunk() {
        return this.totalDrinkVolume > 150;
    }

    getTotallyDrunk() {
        return this.totalDrinkVolume;
    }

    get birthDay() {
        return birthDay;
    }
}

module.exports = Visitor;