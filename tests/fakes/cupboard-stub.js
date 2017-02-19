/**
 * Created by tarasenko on 15.02.2017.
 */

class CupboardStub {

    constructor() {
        this._empty = false;
    }

    isOpen() {
        return true;
    };

    hasDrink(drinkName, volume) {
        return !this._empty;
    };

    getDrink(drinkName, volume) {
        return volume;
    }

    set empty(value) {
        this._empty = value;
    }
}

module.exports = CupboardStub;