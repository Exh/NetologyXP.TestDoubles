"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var CupboardStub = require('../tests/fakes/cupboard-stub.js');
var CalendarStub = require('../tests/fakes/calendar-stub.js');
var SmsServiceMock = require('../tests/fakes/sms-service-mock.js');
var VisitorMock = require('../tests/fakes/visitor-mock.js');

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
        calendar.currentDate = "16.02.2016";
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

        test("barmen pours x3 volume on a visitor who has a birthday today ", function(){
            calendar.currentDate = "15.02.2017";
            visitor = new Visitor("15.02.2017");
            let barmen = new Barmen(alwaysFullCupboard, calendar, smsService);

            let volumeInGlass = barmen.pour("vodka", 100, visitor);

            assert.equal(3 * 100, volumeInGlass);
        });

        test("barmen pour 150 ml of vodka and visitor recieve receipt about it", function() {
            visitor = new VisitorMock();
            visitor.sober();
            let barmen = new Barmen(alwaysFullCupboard, calendar, smsService);

            let volumeInGlass = barmen.pour("vodka", 150, visitor);

            assert.equal(visitor.lastReceipt, "Your drinks: vodka 150 ml" );
        });

        test("sms the cupboard was closed is sent to boss", function(){
            let cupboard = new CupboardStub(false);
            cupboard.empty = false;
            let barmen = new Barmen(cupboard, calendar, smsService);

            runSafely(() => { barmen.pour("vodka", 150, visitor); } );

            assert.equal(smsService.lastSendMessage, "We have lost the key. Cupboard is closed.");
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

