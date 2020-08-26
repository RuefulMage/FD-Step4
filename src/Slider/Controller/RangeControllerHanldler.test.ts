import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import CONSTANTS from '../Utils/Constants';
import Orientation from '../Utils/Orientation';
import RangeControllerHandler from './RangeControllerHandler';

describe('RangeControllerHandler class', () => {
  let view: View;
  let model: Model;
  let viewOptions;
  let modelOptions;
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

  describe('Update runners positions', () => {
    test('Should change runners positions to values from model', () => {
      model.setHighValueByPercent(15);
      model.setLowValueByPercent(5);
      controllerHandler.updateRunnersPosition();

      expect(Number(view.getRunnerPosition(0))).toBe(5);
      expect(Number(view.getRunnerPosition(1))).toBe(15);
    });
  });

  describe('Update tips positions and text', () => {
    test('Should change tips positions and inner text to values from model', () => {
      view.showTips();
      model.setHighValueByPercent(55);
      model.setLowValueByPercent(5);
      controllerHandler.updateTipsPositionAndText();

      const tips = view.getDOMNode().querySelectorAll(`.${CONSTANTS.tipClassName}`);
      const lowTip = tips[0] as HTMLElement;
      const highTip = tips[1] as HTMLElement;

      expect(Number(lowTip.innerText)).toBe(model.getLowValue());
      expect(Number(highTip.innerText)).toBe(model.getHighValue());
    });

    test('When tips is too close, should join it', () => {
      model.setLowValueByPercent(5);
      model.setHighValueByPercent(5 + CONSTANTS.tipsJoinDistance);
      controllerHandler.updateTipsPositionAndText();

      const tips = view.getDOMNode().querySelectorAll(`.${CONSTANTS.tipClassName}`);
      const lowTip = tips[0] as HTMLElement;

      expect(lowTip.innerText).toBe(`${model.getLowValue()} - ${model.getHighValue()}`);
    });
  });

  describe('Value change handler', () => {
    test('Should change runners positions in view to positions in model'
            + 'and change range', () => {
      model.setHighValue(60);
      controllerHandler.handleValueChange();

      expect(view.getRunnerPosition(0)).toBe(model.getLowValueInPercent());
      expect(view.getRunnerPosition(1)).toBe(model.getHighValueInPercent());

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
      controllerHandler.handlePositionChangeByClick({ position: 20 });

      expect(view.getRunnerPosition(0)).toBe(20);
      expect(model.getLowValueInPercent()).toBe(20);

      controllerHandler.handlePositionChangeByClick({ position: 80 });

      expect(view.getRunnerPosition(1)).toBe(80);
      expect(model.getHighValueInPercent()).toBe(80);

      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(view.getRunnerPosition(0));
      expect(maxEdge).toBe(view.getRunnerPosition(1));
    });
  });

  describe('Position change by drag handler', () => {
    test('Should set runner with input index position in view and in model and update range', () => {
      controllerHandler.handlePositionChangeByDrag({ runnerIndex: 0, position: 30 });

      expect(view.getRunnerPosition(0)).toBe(30);
      expect(model.getLowValueInPercent()).toBe(30);

      controllerHandler.handlePositionChangeByDrag({ runnerIndex: 1, position: 70 });

      expect(view.getRunnerPosition(1)).toBe(70);
      expect(model.getHighValueInPercent()).toBe(70);

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
