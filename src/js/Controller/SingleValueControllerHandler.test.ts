import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import SingleValueControllerHandler from './SingleValueControllerHandler';
import CONSTANTS from '../Utils/Constants';
import ViewOptions from '../Utils/ViewOptions';
import ModelOptions from '../Utils/ModelOptions';
import Orientation from '../Utils/Orientation';

describe('SingleValueControllerHandler class', () => {
  let view: View;
  let model: Model;
  let viewOptions: ViewOptions;
  let modelOptions: ModelOptions;
  let controllerHandler: SingleValueControllerHandler;

  beforeEach(() => {
    viewOptions = {
      divisionsAmount: 2,
      isRange: false,
      isTipsHidden: true,
      maxValue: 100,
      minValue: 0,
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
});
