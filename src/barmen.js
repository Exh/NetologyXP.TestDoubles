'use strict';

class Barmen {
    constructor(cupboard, calendar, smsService) {
        this._cupboard = cupboard;
        this._calendar = calendar;
        this._smsService = smsService;
    }

    pour(drinkName, volume, visitor) {
        if (!this._cupboard.isOpen())
        {
            this._smsService.send("We have lost the key. Cupboard is closed.");
            throw new Error('Sorry. The key was lost.');
        }

        if (!this._cupboard.hasDrink(drinkName, volume)) {
            this._smsService.send("We are running out of " + drinkName + ". Please buy several bottles.");
            throw new Error('Sorry. Not enough ' + drinkName);
        }


        if (this._calendar.currentDate === visitor.birthDay)
        {
            var result_volume = this._cupboard.getDrink(drinkName, volume) * 3;
            this.printReceipt(drinkName, result_volume, visitor);
            return result_volume;
        }
        else if (this._calendar.today === "Thusday")
        {
            var result_volume = this._cupboard.getDrink(drinkName, volume) * 2;
            this.printReceipt(drinkName, result_volume, visitor);
            return result_volume;
        }

        var result_volume = this._cupboard.getDrink(drinkName, volume);
        this.printReceipt(drinkName, result_volume, visitor);
        return result_volume;
    }

    printReceipt(drinkName, volume, visitor)
    {
        var receipt = "Your drinks: " + drinkName + " "  + volume + " ml";
        visitor.takeReceipt(receipt);
    }
}

module.exports = Barmen;