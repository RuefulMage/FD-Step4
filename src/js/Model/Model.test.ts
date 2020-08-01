import Model from './Model';
import IObserver from '../Observer/IObserver';
import ModelOptions from '../Utils/ModelOptions';

describe('Class Model', () => {
  let options: ModelOptions;

  beforeEach(() => {
    options = {
      isRange: false,
      maxValue: 100,
      minValue: 0,
      startValueHigh: 100,
      startValueLow: 0,
      step: 1,
    };
  });

  describe('Create instance model', () => {
    test('Should be created an instance of model and not to be undefined', () => {
      const model = new Model(options);

      expect(model).toBeDefined();
    });

    test('Should be thrown an error in created an instance of model, because options is not valid', () => {
      options.minValue = 0;
      options.maxValue = 0;
      options.step = 0;

      expect(() => { const model = new Model(options); }).toThrow();
    });
  });

  describe('Get isRange value', () => {
    test('Should return current value of isRange attribute, when isRange is true', () => {
      options.isRange = true;
      const model = new Model(options);

      expect(model.getRangeStatus()).toBe(true);
    });

    test('Should return current value of isRange attribute, when isRange is false', () => {
      options.isRange = false;
      const model = new Model(options);

      expect(model.getRangeStatus()).toBe(false);
    });
  });

  describe('Set isRange value', () => {
    test('Should change isRange attribute value to given value from false', () => {
      options.isRange = false;
      let model = new Model(options);
      model.setRangeMode(false);

      expect(model.getRangeStatus()).toBe(false);

      model = new Model(options);
      model.setRangeMode(true);

      expect(model.getRangeStatus()).toBe(true);
    });

    test('Should change isRange attribute value to given value from true', () => {
      options.isRange = true;
      let model = new Model(options);
      model.setRangeMode(true);

      expect(model.getRangeStatus()).toBe(true);

      model = new Model(options);
      model.setRangeMode(false);

      expect(model.getRangeStatus()).toBe(false);
    });
  });

  describe('Get max value', () => {
    test('Should return current max value', () => {
      options.maxValue = 250;
      const model = new Model(options);

      expect(model.getMaxValue()).toBe(250);
    });
  });

  describe('Set max value', () => {
    test('Should set current max value attribute to given value', () => {
      const model = new Model(options);
      model.setMaxValue(200);

      expect(model.getMaxValue()).toBe(200);

      model.setMaxValue(50);

      expect(model.getMaxValue()).toBe(50);
    });

    test('Should throw Error while setting max value to given invalid value', () => {
      options.maxValue = 100;
      options.minValue = 0;
      options.step = 5;
      const model = new Model(options);

      // При данном значении разница между максимум и минимумом будет меньше шага
      expect(() => { model.setMaxValue(4); }).toThrowError();

      // Данное значение меньше минимального
      expect(() => { model.setMaxValue(-10); }).toThrowError();
    });
  });

  describe('Get min value', () => {
    test('Should return a current min value', () => {
      options.maxValue = 100;
      options.minValue = 0;
      options.step = 5;
      const model = new Model(options);

      expect(model.getMinValue()).toBe(0);
    });
  });

  describe('Set min value', () => {
    test('Should set current min value attribute to given value', () => {
      const model = new Model(options);
      model.setMinValue(-50);

      expect(model.getMinValue()).toBe(-50);

      model.setMinValue(50);

      expect(model.getMinValue()).toBe(50);
    });

    test('Should throw Error while setting min value to given invalid value', () => {
      options.maxValue = 100;
      options.minValue = 0;
      options.step = 5;
      const model = new Model(options);

      // При данном значении разница между максимум и минимумом будет меньше шага
      expect(() => { model.setMinValue(96); }).toThrowError();

      // Данное значние больше максимального значения
      expect(() => { model.setMinValue(200); }).toThrowError();
    });
  });

  describe('Get low value', () => {
    test('Should return current low value', () => {
      options.startValueLow = 10;
      const model = new Model(options);

      expect(model.getLowValue()).toBe(10);
    });
  });

  describe('Set low value', () => {
    test('Should validate given value and set low value attribute to given validated value', () => {
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

    test('When isRange is true and given value is closer to high value than step or greater than high value'
            + 'should set low value to nearest to high value valid value', () => {
      options.isRange = true;
      options.startValueLow = 0;
      options.startValueHigh = 50;
      options.step = 5;
      const model = new Model(options);
      model.setLowValue(47);

      expect(model.getLowValue()).toBe(45);

      model.setLowValue(80);

      expect(model.getLowValue()).toBe(45);
    });

    test('When given value is less than min value, should set low value to min value', () => {
      options.startValueLow = 10;
      options.minValue = 0;
      const model = new Model(options);
      model.setLowValue(-10);

      expect(model.getLowValue()).toBe(model.getMinValue());
    });

    test('When isRange is false and given value is bigger than max value, should set low value '
            + 'to max value', () => {
      options.isRange = false;
      options.maxValue = 100;
      const model = new Model(options);
      model.setLowValue(110);

      expect(model.getLowValue()).toBe(model.getMaxValue());
    });
  });

  describe('Get low value in percents', () => {
    test('Should return correct low value in percents', () => {
      options.startValueLow = 15;
      let model = new Model(options);

      expect(model.getLowValueInPercents()).toBe(15);

      options.minValue = -50;
      options.maxValue = 150;
      model = new Model(options);

      expect(model.getLowValueInPercents()).toBe(32.5);
    });
  });

  describe('Set low value by giving a percent to input', () => {
    test('Should correctly convert percent to value, validate it and set low value to converted given value', () => {
      options.minValue = -50;
      options.maxValue = 100;
      const model = new Model(options);
      model.setLowValueByPercents(15);

      expect(model.getLowValue()).toBe(-27);
    });

    test('When given value bigger than 100, should be set low value to maximally possibly value', () => {
      options.minValue = -50;
      options.maxValue = 100;
      let model = new Model(options);
      model.setLowValueByPercents(150);

      expect(model.getLowValue()).toBe(100);

      options.startValueHigh = 50;
      options.isRange = true;
      model = new Model(options);
      model.setLowValueByPercents(110);

      expect(model.getLowValue()).toBe(49);
    });

    test('When given value less than 0, should bet set low value to min value', () => {
      options.minValue = -100;
      const model = new Model(options);
      model.setLowValueByPercents(-10);

      expect(model.getLowValue()).toBe(-100);
    });
  });

  describe('Get high value', () => {
    test('Should return current high value', () => {
      options.startValueHigh = 50;
      const model = new Model(options);

      expect(model.getHighValue()).toBe(50);
    });
  });

  describe('Set high value', () => {
    test('Should validate given value and set high value attribute to given validated value', () => {
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

    test('When given value is closer to low value less than one step or less than low value, '
            + 'should set high value to nearest to low value valid value', () => {
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

    test('When given value is bigger than max value, should set high value to max value', () => {
      options.maxValue = 100;
      const model = new Model(options);
      model.setHighValue(150);

      expect(model.getHighValue()).toBe(model.getMaxValue());
    });
  });

  describe('Get high value in percents', () => {
    test('Should return correct high value in percents', () => {
      options.startValueHigh = 25;
      let model = new Model(options);

      expect(model.getHighValueInPercents()).toBe(25);

      options.minValue = -50;
      options.maxValue = 150;
      model = new Model(options);

      expect(model.getHighValueInPercents()).toBe(37.5);
    });
  });

  describe('Set high value by giving a percent to input', () => {
    test('Should correctly convert percent to value, validate it and set high value to converted given value',
      () => {
        options.maxValue = 150;
        options.minValue = 0;
        const model = new Model(options);
        model.setHighValueByPercents(20);

        expect(model.getHighValue()).toBe(30);
      });

    test('When given value bigger than 100, should be set high value to max value', () => {
      options.maxValue = 150;
      const model = new Model(options);
      model.setHighValueByPercents(120);

      expect(model.getHighValue()).toBe(model.getMaxValue());
    });
  });

  describe('Get step', () => {
    test('Should return current step', () => {
      options.step = 15;
      const model = new Model(options);

      expect(model.getStep()).toBe(15);
    });
  });

  describe('Set step', () => {
    test('Should set current step to given and validate low and high values', () => {
      options.step = 2;
      options.startValueLow = 5;
      options.startValueHigh = 10;
      // options.isRange = true;
      const model = new Model(options);
      model.setStep(3);

      expect(model.getStep()).toBe(3);
      expect(model.getLowValue()).toBe(6);
    });

    test('Should throw error, when input value is not valid', () => {
      options.maxValue = 100;
      options.minValue = 0;
      const model = new Model(options);

      expect(() => { model.setStep(110); }).toThrowError();
      expect(() => { model.setStep(-10); }).toThrowError();
    });
  });

  describe('Publisher methods', () => {
    const mockFunction = jest.fn();
    class Observer implements IObserver {
      update(eventName: string, data?: any): void {}
    }

    Observer.prototype.update = mockFunction;

    test('Attach and detach methods. Should add to observer list input observer '
            + 'and after that remove it from list', () => {
      const observer = new Observer();
      const model = new Model(options);
      model.attach(observer);
      const expectedSetOfObservers = new Set();
      expectedSetOfObservers.add(observer);

      let expectedObject = { observers: expectedSetOfObservers };

      expect(model).toMatchObject(expectedObject);

      model.detach(observer);

      expectedObject = { observers: new Set() };

      expect(model).toMatchObject(expectedObject);
    });

    test('Update method. Should call update method of all in observers list', () => {
      const observer = new Observer();
      const model = new Model(options);
      model.attach(observer);

      model.notify('smth');

      expect(mockFunction.mock.calls.length).toBe(1);
    });
  });
});
