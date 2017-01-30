"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var CupboardStub = require('../tests/cupboard-stub');

suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};
    let alwaysFullCupboard = new CupboardStub();

    setup(function () {
        visitor = new Visitor();
        visitor.sober();
    });

    suite('cupboard is full', function () {
        test('barman pours 200 milliliters of whisky in my glass', function () {
            barmen = new Barmen(alwaysFullCupboard);

            var volumeInGlass = barmen.pour("whisky", 200, visitor);

            assert.equal(200, volumeInGlass);
        });
    });

    suite('cupboard is empty', function () {
        let emptyCupboard = {};

        setup(function () {
            emptyCupboard = new CupboardStub();
            emptyCupboard.empty = true;
        });

        test('barmen rejects for a drink', function () {
            barmen = new Barmen(emptyCupboard);

            var action = () => {
                barmen.pour("whisky", 200, visitor)
            };

            assert.throws(action, /Sorry. Not enough whisky/);
        });
    });
});