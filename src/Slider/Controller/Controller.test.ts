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
    view.computeScaleSegmentsAmountBySize = () => {return 10};
    View.prototype.updateView = mockUpdateView;
    const model = new Model(modelOptions);

    Model.prototype.setLowValueByPercent = mockSetLowValueByPercent;
    Model.prototype.setHighValueByPercent = mockSetHighValueByPercent;
    controller = new Controller(view, model);

    mockSetLowValueByPercent.mock.calls.length = 0;
    mockSetHighValueByPercent.mock.calls.length = 0;
    mockUpdateView.mock.calls.length = 0;
  });



  describe('Update method', () => {
    test('When position-change-by-drag happens, should set values in model',
      () => {
        controller.update('position-change-by-drag', { runnerIndex: 0, position: 80 });

        expect(mockSetLowValueByPercent.mock.calls.length).toBe(1);
        expect(mockSetLowValueByPercent.mock.calls[0][0])
          .toEqual(80);


        controller.update('position-change-by-drag', { runnerIndex: 1, position: 85 });

        expect(mockSetHighValueByPercent.mock.calls.length).toBe(1);
        expect(mockSetHighValueByPercent.mock.calls[0][0])
          .toEqual(85);
      });

    test('When position-change-by-click happens, should set value in model',
      () => {
        controller.update('position-change-by-click', { runnerIndex: 0, position: 60 });

        expect(mockSetLowValueByPercent.mock.calls.length).toBe(1);
        expect(mockSetLowValueByPercent.mock.calls[0][0])
          .toEqual(60);


        controller.update('position-change-by-click', { runnerIndex: 1, position: 75 });

        expect(mockSetHighValueByPercent.mock.calls.length).toBe(1);
        expect(mockSetHighValueByPercent.mock.calls[0][0])
          .toEqual(75);
      });

    test('When edge-value-change happens, should call updateView method of view', () => {
      controller.update('edge-value-change');

      expect(mockUpdateView.mock.calls.length).toBe(1);
    });

    test('When value-change happens, should call updateView method of view', () => {
      controller.update('value-change');

      expect(mockUpdateView.mock.calls.length).toBe(1);
    });

    test('When range-mode-change happens, should call updateView method of view', () => {
      controller.update('range-mode-change');

      expect(mockUpdateView.mock.calls.length).toBe(1);
    });

    test('When resize happens, should call updateView method of view', () => {
      controller.update('resize');

      expect(mockUpdateView.mock.calls.length).toBe(1);
    });

    test('When step change happens, should call updateView method of view', () => {
      controller.update('step-change');

      expect(mockUpdateView.mock.calls.length).toBe(1);
    });

    test('When happens unknown event, throw error', () => {
      expect(() => {
        controller.update('unknown-event');
      }).toThrowError();
    });
  });
});
