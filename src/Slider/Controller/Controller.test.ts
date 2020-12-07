import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import Orientation from '../Utils/Orientation';
import Controller from './Controller';

describe('Controller class', () => {
  let parentElement: HTMLElement;
  let viewOptions;
  let modelOptions;
  let controller: Controller;

  const mockUpdateView = jest.fn();
  const mockSetLowValueByPercent = jest.fn();
  const mockSetHighValueByPercent = jest.fn();

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
    view.computeDivisionsAmountBySize = () => 10;
    View.prototype.updateView = mockUpdateView;
    const model = new Model(modelOptions);

    Model.prototype.setLowValueByPercent = mockSetLowValueByPercent;
    Model.prototype.setHighValueByPercent = mockSetHighValueByPercent;
    controller = new Controller(view, model);

    mockSetLowValueByPercent.mock.calls.length = 0;
    mockSetHighValueByPercent.mock.calls.length = 0;
    mockUpdateView.mock.calls.length = 0;
  });

  describe('handle view events', () => {
    test('When position-change-by-drag or position-change-by-click happens, should set values in model',
      () => {
        controller.handleViewEvents('position-change-by-drag', { runnerIndex: 0, position: 80 });

        expect(mockSetLowValueByPercent.mock.calls.length).toBe(1);
        expect(mockSetLowValueByPercent.mock.calls[0][0])
          .toEqual(80);

        mockSetLowValueByPercent.mock.calls.length = 0

        controller.handleViewEvents('position-change-by-click', { runnerIndex: 0, position: 90 });

        expect(mockSetLowValueByPercent.mock.calls.length).toBe(1);
        expect(mockSetLowValueByPercent.mock.calls[0][0])
          .toEqual(90);

        controller.handleViewEvents('position-change-by-drag', { runnerIndex: 1, position: 85 });

        expect(mockSetHighValueByPercent.mock.calls.length).toBe(1);
        expect(mockSetHighValueByPercent.mock.calls[0][0])
          .toEqual(85);

        mockSetHighValueByPercent.mock.calls.length = 0;

        controller.handleViewEvents('position-change-by-drag', { runnerIndex: 1, position: 95 });

        expect(mockSetHighValueByPercent.mock.calls.length).toBe(1);
        expect(mockSetHighValueByPercent.mock.calls[0][0])
          .toEqual(95);
      });

    test('When resize happens, should call updateView method of view', () => {
      controller.handleViewEvents('resize', {});

      expect(mockUpdateView.mock.calls.length).toBe(1);
    });

    test('When smth happens in model, should call updateView method of view', () => {
      controller.handleModelEvents();

      expect(mockUpdateView.mock.calls.length).toBe(1);
    });
  });
});
