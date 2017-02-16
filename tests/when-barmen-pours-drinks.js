"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var CupboardStub = require('../tests/cupboard-stub.js');



suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};

    setup(function () {
        visitor = new Visitor();
        visitor.sober();
    });

    suite('cupboard is full', function () {
        let alwaysFullCupboard = {};

        setup(function () {
            alwaysFullCupboard = new CupboardStub();
            alwaysFullCupboard.empty = false;
        });
        test('barmen pours 100 milliliters of whisky in my glass', function () {

            let barmen = new Barmen(alwaysFullCupboard);

            let volumeInGlass = barmen.pour("whisky", 100, visitor);

            assert.equal(100, volumeInGlass);
        });

        test('barmen pours x2 volume on a Thursday', function () {

        });

    });

    suite('cupboard is empty', function () {
        let emptyCupboard = [];

        setup(function() {
            emptyCupboard = new CupboardStub();
            emptyCupboard.empty = true;
        });

        test('barmen rejects for a drink', function () {
            let barmen = new Barmen(emptyCupboard);

            let action = () => {
                barmen.pour("vodka", 50, visitor)
            };

            assert.throws(action, /Sorry. Not enough vodka/);
        });

        test('sms to buy drink is sent to boss', function () {

        });
    });

});

