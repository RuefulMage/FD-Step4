import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import RangeControllerHandler from './RangeControllerHandler';
import CONSTANTS from '../Utils/Constants';
import ViewOptions from '../Utils/ViewOptions';
import ModelOptions from '../Utils/ModelOptions';
import Orientation from '../Utils/Orientation';

describe('RangeControllerHandler class', () => {
  let view: View;
  let model: Model;
  let viewOptions: ViewOptions;
  let modelOptions: ModelOptions;
  let controllerHandler: RangeControllerHandler;

  beforeEach(() => {
    viewOptions = {
      divisionsAmount: 2,
      isRange: true,
      isTipsHidden: true,
      maxValue: 100,
      minValue: 0,
      orientation: Orientation.HORIZONTAL,
    };

    modelOptions = {
      isRange: true,
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
    controllerHandler = new RangeControllerHandler(view, model);
  });

  describe('Value change handler', () => {
    test('Should change runners positions in view to positions in model'
            + 'and change range', () => {
      model.setHighValue(60);
      controllerHandler.valueChangeHandler();

      expect(view.getRunnerPosition(0)).toBe(model.getLowValueInPercents());
      expect(view.getRunnerPosition(1)).toBe(model.getHighValueInPercents());

      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(view.getRunnerPosition(0));
      expect(maxEdge).toBe(view.getRunnerPosition(1));
    });
  });

  describe('Position change by click handler', () => {
    test('Should validate input position and set one of runners(who is nearer) position to validated value'
            + 'and update range',
    () => {
      controllerHandler.positionChangeByClickHandler({ position: 20 });

      expect(view.getRunnerPosition(0)).toBe(20);
      expect(model.getLowValueInPercents()).toBe(20);

      controllerHandler.positionChangeByClickHandler({ position: 80 });

      expect(view.getRunnerPosition(1)).toBe(80);
      expect(model.getHighValueInPercents()).toBe(80);

      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(view.getRunnerPosition(0));
      expect(maxEdge).toBe(view.getRunnerPosition(1));
    });
  });

  describe('Position change by runner handler', () => {
    test('Should set runner with input index position in view and in model and update range', () => {
      controllerHandler.positionChangeByRunnerHandler({ runnerIndex: 0, position: 30 });

      expect(view.getRunnerPosition(0)).toBe(30);
      expect(model.getLowValueInPercents()).toBe(30);

      controllerHandler.positionChangeByRunnerHandler({ runnerIndex: 1, position: 70 });

      expect(view.getRunnerPosition(1)).toBe(70);
      expect(model.getHighValueInPercents()).toBe(70);

      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(view.getRunnerPosition(0));
      expect(maxEdge).toBe(view.getRunnerPosition(1));
    });
  });

  describe('Edge value change handler', () => {
    test('Should set view scale with new max or min values', () => {
      controllerHandler.edgeValueChangeHandler();

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
