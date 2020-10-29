import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import CONSTANTS from '../Utils/Constants';
import Orientation from '../Utils/Orientation';
import SingleValueControllerHandler from './SingleValueControllerHandler';

describe('SingleValueControllerHandler class', () => {
  let view: View;
  let model: Model;
  let viewOptions;
  let modelOptions;
  let controllerHandler: SingleValueControllerHandler;

  beforeEach(() => {
    viewOptions = {
      isRange: false,
      isTipsHidden: true,
      orientation: Orientation.HORIZONTAL,
    };

    modelOptions = {
      isRange: false,
      maxValue: 100,
      minValue: 0,
      startValueHigh: 100,
      startValueLow: 0,
      step: 1,
    };
    const parentElement = document.createElement('div');
    document.body.append(parentElement);

    view = new View(parentElement, viewOptions);
    model = new Model(modelOptions);
    controllerHandler = new SingleValueControllerHandler(view, model);
  });

  describe('Value change handler', () => {
    test('Should change runner position in view to positions in model'
            + 'and change range', () => {
      model.setLowValue(20);
      controllerHandler.handleValueChange();

      expect(view.getRunnerPosition(0)).toBe(model.getLowValueInPercent());

      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(0);
      expect(maxEdge).toBe(view.getRunnerPosition(0));
    });
  });

  describe('Position change by click handler', () => {
    test('Should validate input position and set runner position to validated value'
            + 'and update range',
    () => {
      controllerHandler.handlePositionChangeByClick({ position: 20 });

      expect(view.getRunnerPosition(0)).toBe(20);
      expect(model.getLowValueInPercent()).toBe(20);

      controllerHandler.handlePositionChangeByClick({ position: 80 });

      expect(view.getRunnerPosition(0)).toBe(80);
      expect(model.getLowValueInPercent()).toBe(80);

      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(0);
      expect(maxEdge).toBe(view.getRunnerPosition(0));
    });
  });

  describe('Position change by runner handler', () => {
    test('Should set runner with input index position in view and in model and update range', () => {
      controllerHandler.handlePositionChangeByDrag({ runnerIndex: 0, position: 30 });

      expect(view.getRunnerPosition(0)).toBe(30);
      expect(model.getLowValueInPercent()).toBe(30);

      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(0);
      expect(maxEdge).toBe(view.getRunnerPosition(0));
    });

    test('When runnerIndex != 0, should throw Error', () => {
      expect(() => {
        controllerHandler.handlePositionChangeByDrag({ runnerIndex: 1, position: 30 });
      }).toThrowError();
    });
  });

  describe('Edge value change handler', () => {
    test('Should set view scale with new max or min values', () => {
      controllerHandler.handleEdgeValueChange();

      const firstScaleSubElement = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.scaleClassName)[0].firstChild as HTMLElement;

      const lastScaleSubElement = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.scaleClassName)[0].lastChild as HTMLElement;

      const minScaleValue = parseFloat(firstScaleSubElement.innerText);
      const maxScaleValue = parseFloat(lastScaleSubElement.innerText);

      expect(minScaleValue).toBe(model.getMinValue());
      expect(maxScaleValue).toBe(model.getMaxValue());
    });
  });

  describe('Resize handler', () => {
    test('Should set runner, tips positions and scale', () => {
      const mockUpdateScale = jest.fn();
      const mockUpdateRunner = jest.fn();
      const mockUpdateTips = jest.fn();
      controllerHandler.updateScale = mockUpdateScale;
      controllerHandler.updateTipsPositionAndText = mockUpdateTips;
      view.setRunnerPosition = mockUpdateRunner;

      controllerHandler.handleResize({ scaleDivisionsAmount: 3 });

      expect(mockUpdateScale.mock.calls.length).toBe(1);
      expect(mockUpdateTips.mock.calls.length).toBe(1);
      expect(mockUpdateRunner.mock.calls.length).toBe(1);
      expect(mockUpdateRunner.mock.calls[0][0]).toBe(0);
    });
  });

  describe('Step change handler', () => {
    test('Should set runner, tips positions and scale', () => {
      const mockUpdateScale = jest.fn();
      const mockUpdateRunner = jest.fn();
      const mockUpdateTips = jest.fn();
      controllerHandler.updateScale = mockUpdateScale;
      controllerHandler.updateTipsPositionAndText = mockUpdateTips;
      view.setRunnerPosition = mockUpdateRunner;

      controllerHandler.handleStepChange();

      expect(mockUpdateScale.mock.calls.length).toBe(1);
      expect(mockUpdateTips.mock.calls.length).toBe(1);
      expect(mockUpdateRunner.mock.calls.length).toBe(1);
      expect(mockUpdateRunner.mock.calls[0][0]).toBe(0);
    });
  });

  describe('Get scale postions', () => {
    test('Should take input divisions amount '
        + 'and get map of values and positions by asking the model', () => {
      const expectedMap = new Map<number, number>();
      expectedMap.set(0, 0)
        .set(10, 10).set(20, 20)
        .set(30, 30)
        .set(40, 40)
        .set(50, 50)
        .set(60, 60)
        .set(70, 70)
        .set(80, 80)
        .set(90, 90)
        .set(100, 100);

      const result = controllerHandler.getScalePositions(10);

      expect(result).toEqual(expectedMap);
    });
  });

  describe('Update scale', () => {
    test('Should take input divisions amount, validate it,'
        + ' take divisions values from model and call setScale method', () => {
      controllerHandler.updateScale(2);

      const firstScaleSubElement = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.scaleClassName)[0].children[0] as HTMLElement;
      const secondScaleSubElement = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.scaleClassName)[0].children[1] as HTMLElement;
      const lastScaleSubElement = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.scaleClassName)[0].children[2] as HTMLElement;

      const resultScaleValues = [firstScaleSubElement.innerText,
        secondScaleSubElement.innerText, lastScaleSubElement.innerText];
      const expectedScaleValues = ['0', '50', '100'];

      expect(resultScaleValues).toEqual(expectedScaleValues);
    });

    test('If input divisions amount bigger than steps in range, '
        + 'should return amount of steps in range', () => {
      const expectedAmount = 11;
      model.setMaxValue(50);
      model.setMinValue(0);
      model.setStep(5);

      controllerHandler.updateScale(400);
      const amountOfDivisions = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.scaleClassName)[0].children.length;

      expect(amountOfDivisions).toBe(expectedAmount);
    });
  });
});
