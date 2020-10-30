import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import Range from './Range';

describe('Range class', () => {
  let parentElement: HTMLElement;
  let range: Range;
  const mockFunctionForSetRangePosition = jest.fn();
  const mockFunctionForResetStyles = jest.fn();

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["setPosition",
"getPositionFromCoordinates", "resetStyles", "setRangePositions"] }] */
  class OrientationBehavior implements IOrientationBehavior {
    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
      return 0;
    }

    resetStyles(runner: HTMLElement): void {
      mockFunctionForResetStyles();
    }

    setPosition(newPosition: number, domElement: HTMLElement): number {
      return 0;
    }

    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
      mockFunctionForSetRangePosition();
    }
  }

  beforeEach(() => {
    parentElement = document.createElement('div');
    document.body.append(parentElement);
    const orientationBehavior = new OrientationBehavior();
    range = new Range(parentElement, orientationBehavior);
  });

  describe('Create range object', () => {
    test('Should be created an instance of range and not to be undefined', () => {
      const orientationBehavior = new OrientationBehavior();
      range = new Range(parentElement, orientationBehavior, 0, 100);

      expect(range).toBeDefined();
    });

    test('When arguments only 2, should be created with default options', () => {
      const orientationBehavior = new OrientationBehavior();
      range = new Range(parentElement, orientationBehavior);

      expect(range).toBeDefined();
      expect(range.getLowEdge()).toBe(0);
      expect(range.getHighEdge()).toBe(100);
    });
  });
  describe('Get min edge', () => {
    test('Should return current min edge. Default min edge equal 0', () => {
      expect(range.getLowEdge()).toBe(0);
    });
  });

  describe('Set min edge to input value', () => {
    test('Should correctly set min edge to input value and call setRangePosition method of orientation behavior',
      () => {
        range.setLowEdge(30);

        expect(range.getLowEdge()).toBe(30);
        expect(mockFunctionForSetRangePosition.mock.calls.length).toBe(1);

        mockFunctionForSetRangePosition.mock.calls.length = 0;
      });
  });

  describe('Get max edge', () => {
    test('Should return current max edge. Default max edge equal 100', () => {
      expect(range.getHighEdge()).toBe(100);
    });
  });

  describe('Set max edge to input value', () => {
    test('Should correctly set max edge to input value and call setRangePosition method of orientation behavior',
      () => {
        range.setHighEdge(50);

        expect(range.getHighEdge()).toBe(50);
        expect(mockFunctionForSetRangePosition.mock.calls.length).toBe(1);

        mockFunctionForSetRangePosition.mock.calls.length = 0;
      });
  });

  describe('Get orientation behavior', () => {
    test('Should return current orientation behavior object', () => {
      const output = range.getOrientationBehavior();

      expect(output).toBeInstanceOf(OrientationBehavior);
    });
  });

  describe('Set orientation behavior', () => {
    test('Should  set orientation behavior to input orientation behavior'
            + 'and call resetStyles and setRangePositions methods of orientation behavior', () => {
      const orientationBehavior = new OrientationBehavior();
      range.setOrientationBehavior(orientationBehavior);

      expect(range.getOrientationBehavior()).toEqual(orientationBehavior);
      expect(mockFunctionForResetStyles.mock.calls.length).toBe(1);
      expect(mockFunctionForSetRangePosition.mock.calls.length).toBe(1);

      mockFunctionForResetStyles.mock.calls.length = 0;
      mockFunctionForSetRangePosition.mock.calls.length = 0;
    });
  });

  describe('Destroy dom element', () => {
    test('Should destroy dom element', () => {
      range.destroy();
      const rangeElement = parentElement.getElementsByClassName(CONSTANTS.rangeClassName)[0];
      expect(rangeElement).toBeUndefined();
    });
  });
});
