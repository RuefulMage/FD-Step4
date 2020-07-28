import { Model } from './Model';
import { modelOptions } from '../Utils/types';
import { IObserver } from '../Observer/IObserver';
import isMockFunction = jest.isMockFunction;

describe('Class Model', function() {

    let options: modelOptions;

    beforeEach(function() {
        options = {
            isRange: false,
            maxValue: 100,
            minValue: 0,
            startValueHigh: 100,
            startValueLow: 0,
            step: 1
        }
    });

    describe('Create instance model', function() {

        test('Should be created an instance of model and not to be undefined', function() {

            const model = new Model(options);

            expect(model).toBeDefined();
        });


        test('Should be thrown an error in created an instance of model, because options is not valid', function() {
            options.minValue = 0;
            options.maxValue = 0;
            options.step = 0;

            expect(() => {new Model(options)}).toThrow();
        });
    });

    describe('Get isRange value', function() {

        test('Should return current value of isRange attribute', function() {
            options.isRange = true;
            const model = new Model(options);

            expect(model.isRange()).toBe(true);
        });

        test('Should return current value of isRange attribute', function() {
            options.isRange = false;
            const model = new Model(options);

            expect(model.isRange()).toBe(false);
        });
    });



    describe('Set isRange value', function() {
        test('Should change isRange attribute value to given value from false', function() {
            options.isRange = false;
            let model = new Model(options);
            model.setRangeMode(false);

            expect(model.isRange()).toBe(false);

            model = new Model(options);
            model.setRangeMode(true)

            expect(model.isRange()).toBe(true);
        });


        test('Should change isRange attribute value to given value from true', function() {
            options.isRange = true;
            let model = new Model(options);
            model.setRangeMode(true);

            expect(model.isRange()).toBe(true);


            model = new Model(options);
            model.setRangeMode(false);

            expect(model.isRange()).toBe(false);
        });
    });


    describe('Get max value', function() {
        test('Should return current max value', function() {
            options.maxValue = 250;
            let model = new Model(options);

            expect(model.getMaxValue()).toBe(250);
        });
    });

    describe('Set max value', function() {
        test('Should set current max value attribute to given value', function(){
            let model = new Model(options);
            model.setMaxValue(200);

            expect(model.getMaxValue()).toBe(200);

            model.setMaxValue(50);

            expect(model.getMaxValue()).toBe(50);
        });

        test('Should throw Error while setting max value to given invalid value', function () {
            options.maxValue = 100;
            options.minValue = 0;
            options.step = 5;
            let model = new Model(options);

            // При данном значении разница между максимум и минимумом будет меньше шага
            expect(() => {model.setMaxValue(4)}).toThrowError();

            // Данное значение меньше минимального
            expect(() => {model.setMaxValue(-10)}).toThrowError();
        });
    });


    describe('Get min value', function() {
        test('Should return a current min value', function() {
            options.maxValue = 100;
            options.minValue = 0;
            options.step = 5;
            let model = new Model(options);

            expect(model.getMinValue()).toBe(0);
        });
    });



    describe('Set min value', function() {
        test('Should set current min value attribute to given value', function(){
            let model = new Model(options);
            model.setMinValue(-50);

            expect(model.getMinValue()).toBe(-50);

            model.setMinValue(50);

            expect(model.getMinValue()).toBe(50);
        });

        test('Should throw Error while setting min value to given invalid value', function () {
            options.maxValue = 100;
            options.minValue = 0;
            options.step = 5;
            let model = new Model(options);

            // При данном значении разница между максимум и минимумом будет меньше шага
            expect(() => {model.setMinValue(96)}).toThrowError();

            // Данное значние больше максимального значения
            expect(() => {model.setMinValue(200)}).toThrowError();
        });
    });


    describe('Get low value', function() {

        test('Should return current low value', function() {
            options.startValueLow = 10;
            let model = new Model(options);

            expect(model.getLowValue()).toBe(10);
        });

    });


    describe('Set low value', function() {
        test('Should validate given value and set low value attribute to given validated value', function() {
            options.startValueLow = 0;
            options.startValueHigh = 100;
            options.step = 1;
            let model = new Model(options);
            model.setLowValue(7);

            expect(model.getLowValue()).toBe(7);

            options.step = 2;
            model = new Model(options);
            model.setLowValue(7);

            expect(model.getLowValue()).toBe(8);

            options.step = 3;
            model = new Model(options);
            model.setLowValue(7);

            expect(model.getLowValue()).toBe(6);

        });


        test('When isRange is true and given value is closer to high value than step or greater than high value' +
            'should set low value to nearest to high value valid value', function () {

            options.isRange = true;
            options.startValueLow = 0;
            options.startValueHigh = 50;
            options.step = 5;
            let model = new Model(options);
            model.setLowValue(47);

            expect(model.getLowValue()).toBe(45);

            model.setLowValue(80);

            expect(model.getLowValue()).toBe(45);
        });


        test('When given value is less than min value, should set low value to min value', function() {
            options.startValueLow = 10;
            options.minValue = 0;
            let model = new Model(options);
            model.setLowValue(-10);

            expect(model.getLowValue()).toBe(model.getMinValue());
        });

        test('When isRange is false and given value is bigger than max value, should set low value ' +
            'to max value', function() {
            options.isRange = false;
            options.maxValue = 100;
            let model = new Model(options);
            model.setLowValue(110);

            expect(model.getLowValue()).toBe(model.getMaxValue());
        });
    });


    describe('Get low value in percents', function() {
        test('Should return correct low value in percents', function() {
            options.startValueLow = 15;
            let model = new Model(options);

            expect(model.getLowValueInPercents()).toBe(15);

            options.minValue = -50;
            options.maxValue = 150;
            model = new Model(options);

            expect(model.getLowValueInPercents()).toBe(32.5);

        });

    });

    describe('Set low value by giving a percent to input', function() {
        test('Should correctly convert percent to value, validate it and set low value to converted given value', function() {
            options.minValue = -50;
            options.maxValue = 100;
            let model = new Model(options);
            model.setLowValueByPercents(15);

            expect(model.getLowValue()).toBe(-27);
        });

        test('When given value bigger than 100, should be set low value to maximally possibly value', function() {
            options.minValue = -50;
            options.maxValue = 100;
            let model = new Model(options);
            model.setLowValueByPercents(150);

            expect( model.getLowValue() ).toBe(100);


            options.startValueHigh = 50;
            options.isRange = true;
            model = new Model(options);
            model.setLowValueByPercents(110);

            expect(model.getLowValue()).toBe(49);
        });

        test('When given value less than 0, should bet set low value to min value', function() {
            options.minValue = -100;
            let model = new Model(options);
            model.setLowValueByPercents(-10);

            expect(model.getLowValue()).toBe(-100);
        })
    });


    describe('Get high value', function() {
        test('Should return current high value', function() {
            options.startValueHigh = 50;
            let model = new Model(options);

            expect(model.getHighValue()).toBe(50);
        });
    });

    describe('Set high value', function() {
        test('Should validate given value and set high value attribute to given validated value', function() {
            let model = new Model(options);
            model.setHighValue(7);

            expect(model.getHighValue()).toBe(7);

            options.step = 2;
            model = new Model(options);
            model.setHighValue(7);

            expect(model.getHighValue()).toBe(8);

            options.step = 3;
            model = new Model(options);
            model.setHighValue(7);

            expect(model.getHighValue()).toBe(6);
        });

        test('When given value is closer to low value less than one step or less than low value, ' +
            'should set high value to nearest to low value valid value', function() {
            options.step = 5;
            options.startValueLow = 15;
            let model = new Model(options);
            model.setHighValue(18);

            expect(model.getHighValue()).toBe(20);

            options.step = 7;
            options.startValueLow = 14;
            model = new Model(options);
            model.setHighValue(10);

            expect(model.getHighValue()).toBe(21);

        });

        test('When given value is bigger than max value, should set high value to max value', function() {
            options.maxValue = 100;
            let model = new Model(options);
            model.setHighValue(150);

            expect(model.getHighValue()).toBe(model.getMaxValue());
        });
    });


    describe('Get high value in percents', function() {
        test('Should return correct high value in percents', function() {
            options.startValueHigh = 25;
            let model = new Model(options);

            expect(model.getHighValueInPercents()).toBe(25);

            options.minValue = -50;
            options.maxValue = 150;
            model = new Model(options);

            expect(model.getHighValueInPercents()).toBe(37.5);

        });
    });

    describe('Set high value by giving a percent to input', function() {
        test('Should correctly convert percent to value, validate it and set high value to converted given value',
            function() {
                options.maxValue = 150;
                options.minValue = 0;
                let model = new Model(options);
                model.setHighValueByPercents(20);

                expect(model.getHighValue()).toBe(30);
            });

        test('When given value bigger than 100, should be set high value to max value', function() {
            options.maxValue = 150;
            let model = new Model(options);
            model.setHighValueByPercents(120);

            expect(model.getHighValue()).toBe(model.getMaxValue());
        });
    });

    describe('Get step', function() {

        test('Should return current step', function() {
            options.step = 15;
            let model = new Model(options);

            expect(model.getStep()).toBe(15);
        });
    });

    describe('Set step', function() {
       test('Should set current step to given and validate low and high values', function() {
            options.step = 2;
            options.startValueLow = 5;
            options.startValueHigh = 10;
            // options.isRange = true;
            let model = new Model(options);
            model.setStep(3);

            expect(model.getStep()).toBe(3);
            expect(model.getLowValue()).toBe(6);
            // expect(model.getHighValue()).toBe(9);
       });

       test('Should throw error, when input value is not valid', function() {
            options.maxValue = 100;
            options.minValue = 0;
            let model = new Model(options);

            expect(() => { model.setStep(110)}).toThrowError();
            expect(() => {model.setStep(-10)}).toThrowError();
       });
    });


    describe('Publisher methods', function() {
        let mockFunction = jest.fn();
        class Observer implements IObserver{
            update(eventName: string, data?: any): void {
                mockFunction();
            }
        }

        test('Attach and detach methods. Should add to observer list input observer ' +
            'and after that remove it from list', function() {

            let observer = new Observer();
            let model = new Model(options);
            model.attach(observer);
            let expectedSetOfObservers = new Set();
            expectedSetOfObservers.add(observer);

            let expectedObject = { _observers: expectedSetOfObservers };

            expect(model).toMatchObject(expectedObject);

            model.detach(observer);

            expectedObject = { _observers: new Set() };

            expect(model).toMatchObject(expectedObject);
        });


        test('Update method. Should call update method of all in observers list', function() {
            let observer = new Observer();
            let model = new Model(options);
            model.attach(observer);

            model.notify('smth');

            expect(mockFunction.mock.calls.length).toBe(1);

        })
    });
});