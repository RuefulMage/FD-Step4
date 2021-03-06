import CONSTANTS from '../../Utils/Constants';
import Orientation from '../../Utils/Orientation';
import View from './View';

const mockUpdate = jest.fn();

describe('View class', () => {
  let parentElement: HTMLElement;
  let options: {
    isRange: boolean,
    isTipsHidden: boolean,
    maxValue: number,
    minValue: number,
    orientation: Orientation
  };

  beforeEach(() => {
    options = {
      isRange: true,
      isTipsHidden: true,
      maxValue: 100,
      minValue: 0,
      orientation: Orientation.HORIZONTAL,
    };

    parentElement = document.createElement('div');
    document.body.append(parentElement);
  });

  describe('Create view', () => {
    test('Should create view with range', () => {
      options.isRange = true;
      const view = new View(parentElement, options);
      const runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;

      expect(runnersAmount).toBe(2);
    });

    test('Should create view with one runner', () => {
      options.isRange = false;
      const view = new View(parentElement, options);
      const runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;

      expect(runnersAmount).toBe(1);
    });

    test('When options is empty, should create view with default values', () => {
      const emptyOptions = {};
      const view = new View(parentElement, emptyOptions);

      expect(view).toBeDefined();
    });
  });

  describe('Get hide status', () => {
    test('Should get correct hide status', () => {
      options.isTipsHidden = true;
      let view = new View(parentElement, options);
      let realResult = view.getHideStatus();
      let tip = view.getDOMNode().querySelector(`.${CONSTANTS.tipClassName}`);
      let expectedResult = tip.classList.contains(CONSTANTS.tipHiddenClassName);

      expect(realResult).toBe(expectedResult);

      options.isTipsHidden = false;
      view = new View(parentElement, options);
      realResult = view.getHideStatus();
      tip = view.getDOMNode().querySelector(`.${CONSTANTS.tipClassName}`);
      expectedResult = tip.classList.contains(CONSTANTS.tipHiddenClassName);

      expect(realResult).toBe(expectedResult);
    });
  });

  describe('Hide tips', () => {
    test('Should hide tips by adding css-class to tips dom element', () => {
      options.isTipsHidden = false;
      const view = new View(parentElement, options);
      view.hideTips();
      const tipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[0];

      expect(tipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(true);
    });
  });

  describe('Show tips', () => {
    test('Should show tips by removing css-class from tips classList', () => {
      options.isTipsHidden = true;
      const view = new View(parentElement, options);
      view.showTips();
      const tipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[0];

      expect(tipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(false);
    });
  });

  describe('Get orientation', () => {
    test('Should return current orientation', () => {
      options.orientation = Orientation.VERTICAL;
      const view = new View(parentElement, options);
      const output = view.getOrientation();

      expect(output).toEqual(Orientation.VERTICAL);
    });
  });

  describe('Compute divisions amount by size', () => {
    test('Should return correct divisions amount. Orientation is horizontal', () => {
      let view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientWidth', { value: 1400 });
      let output = view.computeDivisionsAmountBySize();

      expect(output).toBe(10);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientWidth', { value: 1100 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(8);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientWidth', { value: 900 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(6);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientWidth', { value: 700 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(6);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientWidth', { value: 500 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(4);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientWidth', { value: 300 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(3);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientWidth', { value: 100 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(3);
    });

    test('Should return correct divisions amount. Orientation is vertical', () => {
      options.orientation = Orientation.VERTICAL;
      let view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientHeight', { value: 1400 });
      let output = view.computeDivisionsAmountBySize();

      expect(output).toBe(10);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientHeight', { value: 1100 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(8);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientHeight', { value: 900 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(6);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientHeight', { value: 700 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(6);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientHeight', { value: 500 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(4);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientHeight', { value: 300 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(3);

      view = new View(parentElement, options);
      Object.defineProperty(view.getDOMNode(), 'clientHeight', { value: 100 });
      output = view.computeDivisionsAmountBySize();

      expect(output).toBe(3);
    });
  });

  describe('Set orientation', () => {
    test('Should set orientation to input orientation and change classList to needed for this orientaion css-classes'
      + 'When scale is not defined case.', () => {
      options.orientation = Orientation.HORIZONTAL;
      const view = new View(parentElement, options);
      view.setOrientation(Orientation.VERTICAL);
      const orientationStyleClass = CONSTANTS.orientationClassNames.get(Orientation.VERTICAL);

      expect(view.getOrientation()).toEqual(Orientation.VERTICAL);
      expect(view.getDOMNode().classList.contains(orientationStyleClass)).toBe(true);
    });
  });

  describe('Event handlers', () => {
    test('When slider-drag happens should notify all observers and get data of event',
      () => {
        const view = new View(parentElement, options);
        view.attach(mockUpdate);
        const runnerDOMElement = view.getDOMNode()
          .getElementsByClassName(CONSTANTS.runnerClassName)[0];
        const runnerChangeEvent = new CustomEvent('slider-drag',
          { bubbles: true, cancelable: true, detail: { position: 40, target: runnerDOMElement } });

        runnerDOMElement.dispatchEvent(runnerChangeEvent);

        expect(mockUpdate.mock.calls[0][1]).toEqual({ runnerIndex: 0, position: 40 });
        expect(mockUpdate.mock.calls.length).toBe(1);

        mockUpdate.mock.calls.length = 0;
      });

    test('When slider-click happens, should notify all observers', () => {
      const view = new View(parentElement, options);
      view.attach(mockUpdate);
      const runnerDOMElement = parentElement.getElementsByClassName(CONSTANTS.runnerClassName)[0];
      const runnerChangeEvent = new CustomEvent('slider-click',
        { bubbles: true, cancelable: true, detail: { position: 40 } });
      runnerDOMElement.dispatchEvent(runnerChangeEvent);

      expect(mockUpdate.mock.calls[0][1]).toEqual({ position: 40, runnerIndex: 0 });
      expect(mockUpdate.mock.calls.length).toBe(1);

      mockUpdate.mock.calls.length = 0;
    });

    test('When resize happens, should notify all observers', () => {
      const mockUpdateFunc = jest.fn();
      const view = new View(parentElement, options);
      view.attach(mockUpdateFunc);
      window.dispatchEvent(new Event('resize'));

      expect(mockUpdateFunc.mock.calls.length).toBe(1);
    });
  });

  describe('Update view', () => {
    test('Should update runners positions, '
      + 'tips values and positions and scale. Range mode is interval', () => {
      options.isRange = true;
      options.isTipsHidden = false;
      const view = new View(parentElement, options);
      const runnersPositions = [10, 90];
      const tipsValues = [20, 80];
      const scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnersPositions, tipsValues, scaleValues, true);

      const tips = view.getDOMNode().querySelectorAll(`.${CONSTANTS.tipClassName}`);
      const realTipsValues = [Number(tips[0].innerHTML), Number(tips[1].innerHTML)];
      const scaleSubItems = view.getDOMNode().querySelectorAll(`.${CONSTANTS.scaleSubElementClassName}`);
      const realScaleValues: number[] = [];
      scaleSubItems.forEach((value) => {
        realScaleValues.push(Number((value as HTMLElement).innerText));
      });

      expect(realTipsValues).toEqual(tipsValues);
      expect(realScaleValues).toEqual(Array.from(scaleValues.keys()));
    });

    test('Should update view and split tips in one, '
      + 'when they are too close to each other', () => {
      options.isRange = true;
      const view = new View(parentElement, options);
      const runnersPositions = [88, 90];
      const tipsValues = [88, 90];
      const scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnersPositions, tipsValues, scaleValues, true);

      const tips = view.getDOMNode().querySelector(`.${CONSTANTS.tipClassName}`);
      const realTipValue = tips.innerHTML;

      expect(realTipValue).toEqual('88&nbsp;—&nbsp;90');
    });

    test('Should update view and change mode to interval,'
      + ' if runners amount equal one. Range mode is interval', () => {
      options.isRange = false;
      const view = new View(parentElement, options);
      const runnersPositions = [10, 90];
      const tipsValues = [20, 80];
      const scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnersPositions, tipsValues, scaleValues, true);
      const runners = view.getDOMNode().querySelectorAll(`.${CONSTANTS.runnerClassName}`);

      expect(runners.length).toBe(2);
    });

    test('Should update runner position, '
      + 'tip value and position and scale. Range mode is single value', () => {
      options.isRange = false;
      const view = new View(parentElement, options);
      const runnerPosition = [10];
      const tipValue = [20];
      const scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnerPosition, tipValue, scaleValues, false);

      const tip = view.getDOMNode().querySelector(`.${CONSTANTS.tipClassName}`);
      const realTipValue = [Number(tip.innerHTML)];
      const scaleSubItems = view.getDOMNode().querySelectorAll(`.${CONSTANTS.scaleSubElementClassName}`);
      const realScaleValues: number[] = [];
      scaleSubItems.forEach((value) => {
        realScaleValues.push(Number((value as HTMLElement).innerText));
      });

      expect(realTipValue).toEqual(tipValue);
      expect(realScaleValues).toEqual(Array.from(scaleValues.keys()));
    });

    test('Should update view and change mode to single value,'
      + ' if runners amount more than one. Range mode is single value', () => {
      options.isRange = true;
      const view = new View(parentElement, options);
      const runnerPosition = [10, 11];
      const tipValue = [20, 21];
      const scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnerPosition, tipValue, scaleValues, false);
      const runners = view.getDOMNode().querySelectorAll(`.${CONSTANTS.runnerClassName}`);

      expect(runners.length).toBe(1);
    });
  });
});
