"use strickt"

class Calendar
{
    constructor()
    {
        this._today = "Monday";
        this._date = "1.01.2000";
    }

    set today(value)
    {
        this._today = value;
    }

    get today()
    {
        return this._today;
    }

    set currentDate(date)
    {
        this._date = date;
    }

    get currentDate()
    {
        return this._date;
    }
}

module.exports = Calendar;