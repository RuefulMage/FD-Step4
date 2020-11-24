import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import Runner from './Runner';

describe('Runner class', () => {
  let parentElement: HTMLElement;
  let runner: Runner;
  const mockGetPositionFromCoordinates = jest.fn();
  const mockSetPosition = jest.fn();
  const mockFunctionForResetStyles = jest.fn();
  let orientationBehavior: IOrientationBehavior;

  class OrientationBehavior implements IOrientationBehavior {
    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
      mockGetPositionFromCoordinates();
      return 0;
    }

    resetStyles(runnerElement: HTMLElement): void {
      mockFunctionForResetStyles();
    }

    setPosition(newPosition: number, domElement: HTMLElement): number {
      mockSetPosition();
      return 0;
    }

    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
    }
  }

  beforeEach(() => {
    parentElement = document.createElement('div');
    document.body.appendChild(parentElement);
    orientationBehavior = new OrientationBehavior();
    runner = new Runner(parentElement, orientationBehavior);
    mockSetPosition.mock.calls.length = 0;
  });

  afterEach(() => {
    mockSetPosition.mock.calls.length = 0;
  });

  describe('Create range object', () => {
    test('Should be created an instance of range and not to be undefined', () => {
      orientationBehavior = new OrientationBehavior();
      runner = new Runner(parentElement, orientationBehavior, 0);

      expect(runner).toBeDefined();
    });

    test('When arguments only 2, should be created with default options', () => {
      orientationBehavior = new OrientationBehavior();
      runner = new Runner(parentElement, orientationBehavior);

      expect(runner).toBeDefined();
    });
  });

  describe('Get position', () => {
    test('Should return current position. Default position equal 0', () => {
      expect(runner.getPosition()).toBe(0);
    });
  });

  describe('Set position', () => {
    test('Set position to input position and call setPosition method od orientation behavior', () => {
      runner.setPosition(40);

      expect(runner.getPosition()).toBe(40);
      expect(mockSetPosition.mock.calls.length).toBe(1);

      mockSetPosition.mock.calls.length = 0;
    });
  });

  describe('Get orientation behavior', () => {
    test('Should return current orientation behavior object', () => {
      const output = runner.getOrientationBehavior();

      expect(output).toBeInstanceOf(OrientationBehavior);
    });
  });

  describe('Set orientation behavior', () => {
    test('Should  set orientation behavior to input orientation behavior'
      + 'and call resetStyles method of orientation behavior', () => {
      orientationBehavior = new OrientationBehavior();
      runner.setOrientationBehavior(orientationBehavior);

      expect(runner.getOrientationBehavior()).toEqual(orientationBehavior);
      expect(mockFunctionForResetStyles.mock.calls.length).toBe(1);

      mockFunctionForResetStyles.mock.calls.length = 0;
    });
  });

  describe('Destroy dom element', () => {
    test('Should destroy dom element', () => {
      runner.destroy();
      const runnerElement = parentElement.getElementsByClassName(CONSTANTS.runnerClassName)[0];

      expect(runnerElement).toBeUndefined();
    });
  });

  describe('Add mouse event listeners', () => {
    test('When mousedown and mousemove happen, should call getPositionFromCoordinates of orientation behavior '
      + 'and generate custom event slider-drag and after mouseup behavior not calling',
      () => {
        const mousedown = new MouseEvent('mousedown');
        const dragstart = new Event('dragstart');
        const mousemove = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 100,
        });
        const mockEventHandler = jest.fn();
        parentElement.addEventListener('slider-drag', mockEventHandler);
        runner.getDOMNode().dispatchEvent(mousedown);
        runner.getDOMNode().dispatchEvent(dragstart);
        runner.getDOMNode().dispatchEvent(mousemove);

        expect(mockEventHandler.mock.calls.length).toBe(1);
        expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

        const mouseup = new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 100,
        });
        runner.getDOMNode().dispatchEvent(mouseup);
        runner.getDOMNode().dispatchEvent(mousemove);

        expect(mockEventHandler.mock.calls.length).toBe(1);
        expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

        mockGetPositionFromCoordinates.mock.calls.length = 0;
      });

    test('Should call handleMouseUp, when happens Error', () => {
        orientationBehavior.getPositionFromCoordinates = () => {
          throw new Error('');
        };
        const mousedown = new MouseEvent('mousedown');
        const dragstart = new Event('dragstart');
        const mousemove = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 100,
        });
        const mockEventHandler = jest.fn();
        parentElement.addEventListener('slider-drag', mockEventHandler);

        expect(() => {
          runner.getDOMNode().dispatchEvent(mousedown);
          runner.getDOMNode().dispatchEvent(dragstart);
          runner.getDOMNode().dispatchEvent(mousemove);
        }).not.toThrow();
      }
    );
  });

  describe('Add touch event listeners', () => {
    test('When touchstart and touchmove happen, should call getPositionFromCoordinates of orientation behavior '
      + 'and generate custom event slider-drag and after mouseup behavior not calling',
      () => {
        const touchStart = new TouchEvent('touchstart');
        const dragstart = new Event('dragstart');

        const touch = { clientY: 100, clientX: 100 } as Touch;
        const touchMove = new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          targetTouches: [touch],
        });

        const mockTouchEventHandler = jest.fn();
        parentElement.addEventListener('slider-drag', mockTouchEventHandler);
        runner.getDOMNode().dispatchEvent(touchStart);
        runner.getDOMNode().dispatchEvent(dragstart);
        runner.getDOMNode().dispatchEvent(touchMove);

        expect(mockTouchEventHandler.mock.calls.length).toBe(1);
        expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

        const touchEndEvent: TouchEventInit = {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 100,
        } as TouchEventInit;

        const touchEnd = new TouchEvent('touchend', touchEndEvent);
        runner.getDOMNode().dispatchEvent(touchEnd);
        runner.getDOMNode().dispatchEvent(touchMove);

        expect(mockTouchEventHandler.mock.calls.length).toBe(1);
        expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

        mockGetPositionFromCoordinates.mock.calls.length = 0;
      });

    test('Should call touchend, when happens Error', () => {
        orientationBehavior.getPositionFromCoordinates = () => {
          throw new Error('');
        };
      const touchStart = new TouchEvent('touchstart');
      const dragstart = new Event('dragstart');

      const touch = { clientY: 100, clientX: 100 } as Touch;
      const touchMove = new TouchEvent('touchmove', {
        bubbles: true,
        cancelable: true,
        targetTouches: [touch],
      });

      const mockTouchEventHandler = jest.fn();
      parentElement.addEventListener('slider-drag', mockTouchEventHandler);


        expect(() => {
          runner.getDOMNode().dispatchEvent(touchStart);
          runner.getDOMNode().dispatchEvent(dragstart);
          runner.getDOMNode().dispatchEvent(touchMove);
        }).not.toThrow();
      }
    );
  });
});
