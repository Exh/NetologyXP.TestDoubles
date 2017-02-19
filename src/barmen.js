'use strict';

class Barmen {
    constructor(cupboard, calendar, smsService) {
        this._cupboard = cupboard;
        this._calendar = calendar;
        this._smsService = smsService;
    }

    pour(drinkName, volume, visitor) {
        if (!this._cupboard.hasDrink(drinkName, volume)) {
            this._smsService.send("We are running out of " + drinkName + ". Please buy several bottles.");
            throw new Error('Sorry. Not enough ' + drinkName);
        }

        if (this._calendar.today === "Thusday")
        {
            return this._cupboard.getDrink(drinkName, volume) * 2;
        }

        return this._cupboard.getDrink(drinkName, volume);
    }
}

module.exports = Barmen;