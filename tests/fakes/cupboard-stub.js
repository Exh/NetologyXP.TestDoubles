/**
 * Created by tarasenko on 15.02.2017.
 */

class CupboardStub {

    constructor(key = true) {
        this._empty = false;
        this._open = key;
    }

    isOpen() {
        return this._open;
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