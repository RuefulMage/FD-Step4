import Constants from '../../../utils/constants';
import Strip from './Strip';
import OrientationBehavior from '../../orientationBehaviors/OrientationBehavior';

const mockGetPositionFromCoordinates = jest.fn();
OrientationBehavior.prototype.getPositionFromCoordinates = mockGetPositionFromCoordinates;

describe('Strip class', () => {
  let parentNode: HTMLElement;
  let strip: Strip;

  beforeEach(() => {
    parentNode = document.createElement('div');
    document.body.append(parentNode);
    const orientationBehavior = new OrientationBehavior('horizontal');
    strip = new Strip({ parentNode, orientationBehavior });
  });

  describe('Add handler', () => {
    test('When click happens, should create and dispatch slider-click event '
            + 'with position computed by orientationBehavior', () => {
      const click = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      const mockClickHandler = jest.fn();
      parentNode.addEventListener('slider-click', mockClickHandler);
      strip.getDOMNode().dispatchEvent(click);

      expect(mockClickHandler.mock.calls.length).toBe(1);
      expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

      mockClickHandler.mock.calls.length = 0;
      mockGetPositionFromCoordinates.mock.calls.length = 0;
    });

    test('When click on runner happens, should not react to event ', () => {
      const runner = document.createElement('div');
      runner.classList.add(Constants.runnerClassName, Constants.runnerPrefixedClassName);
      strip.getDOMNode().appendChild(runner);
      const click = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });
      const mockClickHandler = jest.fn();
      parentNode.addEventListener('slider-click', mockClickHandler);
      runner.dispatchEvent(click);

      expect(mockClickHandler.mock.calls.length).toBe(0);
      expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(0);
    });
  });
});
