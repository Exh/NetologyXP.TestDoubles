"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var CupboardStub = require('../tests/fakes/cupboard-stub.js');
var CalendarStub = require('../tests/fakes/calendar-stub.js');
var SmsServiceMock = require('../tests/fakes/sms-service-mock.js');

suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};
    let calendar = {};
    let smsService = {};

    setup(function () {
        visitor = new Visitor();
        visitor.sober();

        smsService = new SmsServiceMock();
        calendar = new CalendarStub();
    });

    suite('cupboard is full', function () {
        let alwaysFullCupboard = {};

        setup(function () {
            alwaysFullCupboard = new CupboardStub();
            alwaysFullCupboard.empty = false;
        });
        test('barmen pours 100 milliliters of whisky in my glass', function () {
            let barmen = new Barmen(alwaysFullCupboard, calendar, smsService);

            let volumeInGlass = barmen.pour("whisky", 100, visitor);

            assert.equal(100, volumeInGlass);
        });

        test('barmen pours x2 volume on a Thursday', function () {
            calendar.today = "Thusday";
            let barmen = new Barmen(alwaysFullCupboard, calendar, smsService);

            let volumeInGlass = barmen.pour("juice", 100, visitor);

            assert.equal(2 * 100, volumeInGlass);
        });

    });

    suite('cupboard is empty', function () {
        let emptyCupboard = [];

        setup(function() {
            emptyCupboard = new CupboardStub();
            emptyCupboard.empty = true;
        });

        test('barmen rejects for a drink', function () {
            let barmen = new Barmen(emptyCupboard, calendar, smsService);

            let action = () => {
                barmen.pour("vodka", 50, visitor)
            };

            assert.throws(action, /Sorry. Not enough vodka/);
        });

        test('sms to buy drink is sent to boss', function () {
            var barmen = new Barmen(emptyCupboard, calendar, smsService);

            runSafely(() => { barmen.pour("rum", 100, visitor); } );

            assert.equal(smsService.lastSendMessage, "We are running out of rum. Please buy several bottles.");
        });

        function runSafely(action)
        {
            try {
                action();
            }
            catch(exeption) {

            }
        };
    });

});

