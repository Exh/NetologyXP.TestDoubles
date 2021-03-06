class Visitor {
    constructor(birth_day = "1.01.2000") {
        this.totalDrinkVolume = 0;
        this._birthDay = birth_day;
    }

    drink(volume) {
        this.totalDrinkVolume += volume;
        return volume;
    }

    takeReceipt(receipt) {

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
        return this._birthDay;
    }
}

module.exports = Visitor;