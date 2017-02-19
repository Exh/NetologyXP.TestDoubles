"use strickt"

class CalendarStub
{
    constructor()
    {
        this._today = "Monday";
    }

    set today(value)
    {
        this._today = value;
    }

    get today()
    {
        return this._today;
    }
};

module.exports = CalendarStub;