import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import Orientation from '../Utils/Orientation';
import Controller from './Controller';
import RangeControllerHandler from './RangeControllerHandler';
import SingleValueControllerHandler from './SingleValueControllerHandler';

describe('Controller class', () => {
  let parentElement: HTMLElement;
  let viewOptions;
  let modelOptions;
  let controller: Controller;

  const mockPositionChangeByClick = jest.fn();
  const mockPositionChangeByRunner = jest.fn();
  const mockValueChange = jest.fn();
  const mockEdgeValueChange = jest.fn();
  const mockResize = jest.fn();
  const mockStepChange = jest.fn();

  beforeEach(() => {
    viewOptions = {
      isRange: true,
      isTipsHidden: true,
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
    parentElement = document.createElement('div');
    document.body.append(parentElement);
    const view = new View(parentElement, viewOptions);
    const model = new Model(modelOptions);
    RangeControllerHandler.prototype.handlePositionChangeByClick = mockPositionChangeByClick;
    RangeControllerHandler.prototype.handlePositionChangeByDrag = mockPositionChangeByRunner;
    RangeControllerHandler.prototype.handleValueChange = mockValueChange;
    RangeControllerHandler.prototype.handleEdgeValueChange = mockEdgeValueChange;
    RangeControllerHandler.prototype.handleResize = mockResize;
    RangeControllerHandler.prototype.handleStepChange = mockStepChange;

    controller = new Controller(view, model, true);
  });

  describe('Get controller handler', () => {
    test('Should return current controller handler', () => {
      expect(controller.getControllerHandler()).toBeInstanceOf(RangeControllerHandler);
    });
  });

  describe('Set controller handler', () => {
    test('When input value is true, should set controller handler to RangeControllerHandler',
      () => {
        controller.setControllerHandler(true);

        expect(controller.getControllerHandler()).toBeInstanceOf(RangeControllerHandler);
      });

    test('When input value is false, should set controller handler to SingleValueControllerHandler',
      () => {
        controller.setControllerHandler(false);

        expect(controller.getControllerHandler()).toBeInstanceOf(SingleValueControllerHandler);
      });
  });

  describe('Update method', () => {
    test('When position-change-by-drag happens, should call positionChangeByRunnerHandler  of controller handler with data',
      () => {
        mockPositionChangeByRunner.mock.calls.length = 0;
        controller.update('position-change-by-drag', { runnerIndex: 0, position: 80 });

        expect(mockPositionChangeByRunner.mock.calls.length).toBe(1);
        expect(mockPositionChangeByRunner.mock.calls[0][0])
          .toEqual({ runnerIndex: 0, position: 80 });
      });

    test('When position-change-by-click happens, should call positionChangeByClickHandler  of controller handler with data',
      () => {
        mockPositionChangeByClick.mock.calls.length = 0;
        controller.update('position-change-by-click', { position: 80 });

        expect(mockPositionChangeByClick.mock.calls.length).toBe(1);
        expect(mockPositionChangeByClick.mock.calls[0][0]).toEqual({ position: 80 });
      });

    test('When edge-value-change happens, should call edgeValueChangeHandler of controller handler', () => {
      mockEdgeValueChange.mock.calls.length = 0;
      controller.update('edge-value-change');

      expect(mockEdgeValueChange.mock.calls.length).toBe(1);
    });

    test('When value-change happens, should call valueChangeHandler of controller handler', () => {
      mockValueChange.mock.calls.length = 0;
      controller.update('value-change');

      expect(mockValueChange.mock.calls.length).toBe(1);
    });

    test('When range-mode-change happens, should call setControllerHandler with input data', () => {
      controller.update('range-mode-change', { isRange: true });

      expect(controller.getControllerHandler()).toBeInstanceOf(RangeControllerHandler);

      controller.update('range-mode-change', { isRange: false });

      expect(controller.getControllerHandler()).toBeInstanceOf(SingleValueControllerHandler);
    });

    test('When resize happens, should call handleResize of controller handler', () => {
      mockResize.mock.calls.length = 0;
      controller.update('resize');

      expect(mockResize.mock.calls.length).toBe(1);
    });

    test('When step change happens, should call handleStepChange of controller handler', () => {
      mockStepChange.mock.calls.length = 0;
      controller.update('step-change');

      expect(mockStepChange.mock.calls.length).toBe(1);
    });

    test('When happens unknown event, throw error', () => {
      expect(() => {
        controller.update('unknown-event');
      }).toThrowError();
    });
  });
});
