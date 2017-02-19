"use strick"

class VisitorMock {
    constructor(birth_day = "1.01.2000") {
        this.totalDrinkVolume = 0;
        this._birthDay = birth_day;
        this._lastReceipt = "";
    }

    drink(volume) {
        this.totalDrinkVolume += volume;
        return volume;
    }

    takeReceipt(receipt) {
        // console.log("Visitor receipt: " + receipt + "\n");
        this._lastReceipt = receipt;
    }

    get lastReceipt()
    {
        return this._lastReceipt;
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

module.exports = VisitorMock;
