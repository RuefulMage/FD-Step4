import CONSTANTS from '../../Utils/Constants';
import IObserver from '../../Observer/IObserver';
import Orientation from '../../Utils/Orientation';
import View from './View';

const mockUpdate = jest.fn();

class Observer implements IObserver {
  update(eventName: string, data?: any): void {
    mockUpdate(eventName, data);
  }
}

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

  describe('Get runner position', () => {
    test('Should return current runner position. Default position is 0.', () => {
      options.isRange = true;
      const view = new View(parentElement, options);

      expect(view.getRunnerPosition(0)).toBe(0);
    });

    test('When runner with with index does not exists, should throw Error', () => {
      const view = new View(parentElement, options);

      expect(() => {
        view.getRunnerPosition(3);
      }).toThrowError();

      expect(() => {
        view.getRunnerPosition(-1);
      }).toThrowError();
    });
  });

  describe('Set runner position', () => {
    test('Should set runner position',
      () => {
        const view = new View(parentElement, options);
        view.setRunnerPosition(0, 60);
        const expectedRunnerPosition = view.getRunnerPosition(0);

        expect(expectedRunnerPosition).toBe(60);
      });

    test('When runner with with index does not exists, should throw Error', () => {
      const view = new View(parentElement, options);

      expect(() => {
        view.setRunnerPosition(3, 90);
      }).toThrowError();

      expect(() => {
        view.setRunnerPosition(-1, 80);
      }).toThrowError();
    });
  });

  describe('Set range', () => {
    test('Should set range min and max edges', () => {
      const view = new View(parentElement, options);
      view.setRange(30, 60);
      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(30);
      expect(maxEdge).toBe(60);
    });
  });

  describe('Change mode to range', () => {
    test('Should create runner and tip and change range position', () => {
      options.isRange = false;
      const view = new View(parentElement, options);
      view.changeModeToRange(80, 80);
      const runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;
      const tipsAmount = parentElement.getElementsByClassName(CONSTANTS.tipClassName).length;

      expect(runnersAmount).toBe(2);
      expect(tipsAmount).toBe(2);

      const lowRunnerPosition = view.getRunnerPosition(0);
      const highRunnerPosition = view.getRunnerPosition(1);
      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(lowRunnerPosition);
      expect(maxEdge).toBe(highRunnerPosition);
    });

    test('When range mode already is range, should keep view withuot changes', () => {
      options.isRange = true;
      const view = new View(parentElement, options);
      view.changeModeToRange(80, 80);
      const runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;
      const tipsAmount = parentElement.getElementsByClassName(CONSTANTS.tipClassName).length;

      expect(runnersAmount).toBe(2);
      expect(tipsAmount).toBe(2);
    });
  });

  describe('Change mode to single value', () => {
    test('Should delete onw runner and tip and set range.', () => {
      options.isRange = true;
      const view = new View(parentElement, options);
      view.changeModeToSingle();
      const runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;
      const tipsAmount = parentElement.getElementsByClassName(CONSTANTS.tipClassName).length;

      expect(runnersAmount).toBe(1);
      expect(tipsAmount).toBe(1);

      const lowRunnerPosition = view.getRunnerPosition(0);
      const rangeNode = view.getDOMNode()
        .getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
      const minEdge = parseFloat(rangeNode.style.left);
      const maxEdge = 100 - parseFloat(rangeNode.style.right);

      expect(minEdge).toBe(0);
      expect(maxEdge).toBe(lowRunnerPosition);
    });

    test('When range mode is already single, should keep view without changes', () => {
      options.isRange = false;
      const view = new View(parentElement, options);
      view.changeModeToSingle();
      const runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;
      const tipsAmount = parentElement.getElementsByClassName(CONSTANTS.tipClassName).length;

      expect(runnersAmount).toBe(1);
      expect(tipsAmount).toBe(1);
    });
  });

  describe('Set tip position', () => {
    test('If tip with input index does not exist, should throw error', () => {
      const view = new View(parentElement, options);
      view.setTipPosition(0, 67);

      expect(() => {
        view.setTipPosition(3, 108);
      }).toThrowError();
    });
  });

  describe('Set runner tip test', () => {
    test('Should set tip dom element text to input text', () => {
      const view = new View(parentElement, options);
      view.setTipText(0, 'test text');
      const tipDOMElement = parentElement
        .getElementsByClassName(CONSTANTS.tipClassName)[0] as HTMLElement;

      expect(tipDOMElement.innerHTML).toBe('test text');
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

    test('Should hide tip with input index by adding css-class to tips dom element', () => {
      options.isTipsHidden = false;
      const view = new View(parentElement, options);
      view.hideTip(0);
      const hiddenTipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[0];
      const showedTipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[1];

      expect(hiddenTipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(true);
      expect(showedTipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(false);
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

  describe('Show tip', () => {
    test('Should show tip with input index by removing css-class from tips classList', () => {
      options.isTipsHidden = true;
      const view = new View(parentElement, options);
      view.showTip(0);
      const showedTipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[0];
      const hiddenTipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[1];

      expect(showedTipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(false);
      expect(hiddenTipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(true);
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
      + 'When scale is not defined case.',
      () => {
        options.orientation = Orientation.HORIZONTAL;
        const view = new View(parentElement, options);
        view.setOrientation(Orientation.VERTICAL);
        const orientationStyleClass = CONSTANTS.orientationClassNames.get(Orientation.VERTICAL);

        expect(view.getOrientation()).toEqual(Orientation.VERTICAL);
        expect(view.getDOMNode().classList.contains(orientationStyleClass)).toBe(true);
      });

    test('Should set orientation to input orientation and change classList to needed for this orientaion css-classes.'
      + 'When scale is defined case',
      () => {
        options.orientation = Orientation.HORIZONTAL;
        const view = new View(parentElement, options);
        view.setOrientation(Orientation.VERTICAL);
        const valuesAndPositions = new Map<number, number>();
        valuesAndPositions.set(0, 0).set(50, 50).set(100, 100);
        view.setScale(valuesAndPositions);
        const orientationStyleClass = CONSTANTS.orientationClassNames.get(Orientation.VERTICAL);

        expect(view.getOrientation()).toEqual(Orientation.VERTICAL);
        expect(view.getDOMNode().classList.contains(orientationStyleClass)).toBe(true);
      });

    test('When scale should set orientation of scale', () => {
      options.orientation = Orientation.HORIZONTAL;
      const view = new View(parentElement, options);
      const valuesAndPositions = new Map<number, number>();
      valuesAndPositions.set(0, 0).set(50, 50).set(100, 100);
      view.setScale(valuesAndPositions);
      view.setOrientation(Orientation.VERTICAL);

      expect(view.getOrientation()).toEqual(Orientation.VERTICAL);
    });
  });

  describe('Set scale', () => {
    test('Recreate scale with new input values', () => {
      const view = new View(parentElement, options);
      const startValuesAndPositions = new Map<number, number>();
      startValuesAndPositions.set(40, 0).set(60, 50).set(70, 100);
      view.setScale(startValuesAndPositions);
      const valuesAndPositions = new Map<number, number>();
      valuesAndPositions.set(0, 0).set(50, 50).set(100, 100);

      view.setScale(valuesAndPositions);

      const firstScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
        .firstChild as HTMLElement;
      const secondScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
        .children[1] as HTMLElement;
      const lastScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
        .lastChild as HTMLElement;
      const resultValues = [firstScaleDivision.innerText,
        secondScaleDivision.innerText, lastScaleDivision.innerText];
      const expectedValues = ['0', '50', '100'];

      expect(resultValues).toEqual(expectedValues);
    });

    test('If scale is not exists, should create scale with input values', () => {
      const view = new View(parentElement, options);
      const valuesAndPositions = new Map<number, number>();
      valuesAndPositions.set(0, 0).set(50, 50).set(100, 100);

      view.setScale(valuesAndPositions);

      const firstScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
        .firstChild as HTMLElement;
      const secondScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
        .children[1] as HTMLElement;
      const lastScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
        .lastChild as HTMLElement;
      const resultValues = [firstScaleDivision.innerText,
        secondScaleDivision.innerText, lastScaleDivision.innerText];
      const expectedValues = ['0', '50', '100'];

      expect(resultValues).toEqual(expectedValues);
    });
  });

  describe('Recreate scale', () => {
    test('Should recreate scale with current values', () => {
      const view = new View(parentElement, options);
      view.setScale(new Map<number, number>([[10, 0], [50, 50], [110, 100]]));
      view.reCreateScale();
      const divisionsAmount = parentElement
        .getElementsByClassName(CONSTANTS.scaleSubElementClassName).length;

      const firstScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
        .firstChild as HTMLElement;

      const lastScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
        .lastChild as HTMLElement;
      const minValue = parseFloat(firstScaleDivision.innerText);
      const maxValue = parseFloat(lastScaleDivision.innerText);

      expect(minValue).toBe(10);
      expect(divisionsAmount).toBe(3);
      expect(maxValue).toBe(110);
    });
  });

  describe('Publishers methods', () => {
    test('Attach and detach methods. Should add to observer list input observer '
      + 'and after that remove it from list', () => {
      const view = new View(parentElement, options);
      const observer = new Observer();
      view.attach(observer);
      const expectedSetOfObservers = new Set();
      expectedSetOfObservers.add(observer);
      let expectedObject = { observers: expectedSetOfObservers };

      expect(view).toMatchObject(expectedObject);

      view.detach(observer);
      expectedObject = { observers: new Set() };

      expect(view).toMatchObject(expectedObject);
    });

    test('Should call update method of all in observers list. And after detach, should delete observer'
      + 'from list', () => {
      const observer = new Observer();
      const view = new View(parentElement, options);
      view.attach(observer);
      view.notify('smth');

      expect(mockUpdate.mock.calls.length).toBe(1);

      view.notify('smth', { data: 'smth' });

      expect(mockUpdate.mock.calls.length).toBe(2);

      mockUpdate.mock.calls.length = 0;
    });
  });

  describe('Event handlers', () => {
    test('When slider-drag happens should notify all observers and get data of event',
      () => {
        const observer = new Observer();
        const view = new View(parentElement, options);
        view.attach(observer);
        const runnerDOMElement = parentElement.getElementsByClassName(CONSTANTS.runnerClassName)[0];
        const runnerChangeEvent = new CustomEvent('slider-drag',
          { bubbles: true, cancelable: true, detail: { position: 40, target: runnerDOMElement } });
        runnerDOMElement.dispatchEvent(runnerChangeEvent);

        expect(mockUpdate.mock.calls[0][1]).toEqual({ runnerIndex: 0, position: 40 });
        expect(mockUpdate.mock.calls.length).toBe(1);

        mockUpdate.mock.calls.length = 0;
      });

    test('When slider-click happens, should notify all observers', () => {
      const observer = new Observer();
      const view = new View(parentElement, options);
      view.attach(observer);
      const runnerDOMElement = parentElement.getElementsByClassName(CONSTANTS.runnerClassName)[0];
      const runnerChangeEvent = new CustomEvent('slider-click',
        { bubbles: true, cancelable: true, detail: { position: 40 } });
      runnerDOMElement.dispatchEvent(runnerChangeEvent);

      expect(mockUpdate.mock.calls[0][1]).toEqual({ position: 40, runnerIndex: 0 });
      expect(mockUpdate.mock.calls.length).toBe(1);

      mockUpdate.mock.calls.length = 0;
    });

    test('When resize happens, should notify all observers', () => {
      const observer = new Observer();
      const mockUpdateFunc = jest.fn();
      observer.update = mockUpdateFunc;
      const view = new View(parentElement, options);
      view.attach(observer);
      window.dispatchEvent(new Event('resize'));

      expect(mockUpdateFunc.mock.calls.length).toBe(1);
    });
  });

  describe('Update view', () => {
    test('Should update runners positions, ' +
      'tips values and positions and scale. Range mode is interval', () => {
      options.isRange = true;
      options.isTipsHidden = false;
      const view = new View(parentElement, options);
      let runnersPositions = [10, 90];
      let tipsValues = [20, 80];
      let scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnersPositions, tipsValues, scaleValues, true);

      let realPositions = [view.getRunnerPosition(0), view.getRunnerPosition(1)];
      let tips = view.getDOMNode().querySelectorAll(`.${CONSTANTS.tipClassName}`);
      let realTipsValues = [Number(tips[0].innerHTML), Number(tips[1].innerHTML)];
      let scaleSubItems = view.getDOMNode().querySelectorAll(`.${CONSTANTS.scaleSubElementClassName}`);
      let realScaleValues: number[] = [];
      scaleSubItems.forEach((value, key) => {
        realScaleValues.push(Number((value as HTMLElement).innerText));
      });

      expect(realPositions).toEqual(runnersPositions);
      expect(realTipsValues).toEqual(tipsValues);
      expect(realScaleValues).toEqual(Array.from(scaleValues.keys()));
    });

    test('Should update view and split tips in one, ' +
      'when they are too close to each other', () => {
      options.isRange = true;
      const view = new View(parentElement, options);
      let runnersPositions = [88, 90];
      let tipsValues = [88, 90];
      let scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnersPositions, tipsValues, scaleValues, true);

      let tips = view.getDOMNode().querySelector(`.${CONSTANTS.tipClassName}`);
      let realTipValue = tips.innerHTML;

      expect(realTipValue).toEqual(`88&nbsp;—&nbsp;90`);
    });

    test('Should update view and change mode to interval,' +
      ' if runners amount equal one. Range mode is interval', () => {
      options.isRange = false;
      const view = new View(parentElement, options);
      let runnersPositions = [10, 90];
      let tipsValues = [20, 80];
      let scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnersPositions, tipsValues, scaleValues, true);

      expect(view.getRunnersAmount()).toBe(2);
    });

    test('Should update runner position, ' +
      'tip value and position and scale. Range mode is single value', () => {
      options.isRange = false;
      const view = new View(parentElement, options);
      let runnerPosition = [10];
      let tipValue = [20];
      let scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnerPosition, tipValue, scaleValues, false);

      let realPosition = [view.getRunnerPosition(0)];
      let tip = view.getDOMNode().querySelector(`.${CONSTANTS.tipClassName}`);
      let realTipValue = [Number(tip.innerHTML)];
      let scaleSubItems = view.getDOMNode().querySelectorAll(`.${CONSTANTS.scaleSubElementClassName}`);
      let realScaleValues: number[] = [];
      scaleSubItems.forEach((value, key) => {
        realScaleValues.push(Number((value as HTMLElement).innerText));
      });

      expect(realPosition).toEqual(runnerPosition);
      expect(realTipValue).toEqual(tipValue);
      expect(realScaleValues).toEqual(Array.from(scaleValues.keys()));
    });

    test('Should update view and change mode to single value,' +
      ' if runners amount more than one. Range mode is single value', () => {
      options.isRange = true;
      const view = new View(parentElement, options);
      let runnerPosition = [10, 11];
      let tipValue = [20, 21];
      let scaleValues = new Map([[0, 10], [20, 20], [40, 40], [90, 80]]);
      view.updateView(runnerPosition, tipValue, scaleValues, false);

      expect(view.getRunnersAmount()).toBe(1);
    });
  });
});
