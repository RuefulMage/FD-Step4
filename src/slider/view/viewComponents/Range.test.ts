import Constants from '../../utils/constants';
import Range from './Range';
import OrientationBehavior from '../orientationBehaviors/OrientationBehavior';
import { Orientation } from '../../utils/types';

describe('Range class', () => {
  let parentNode: HTMLElement;
  let range: Range;
  const mockFunctionForSetRangePosition = jest.fn();
  const mockFunctionForResetStyles = jest.fn();
  OrientationBehavior.prototype.setRangePositions = mockFunctionForSetRangePosition;
  OrientationBehavior.prototype.resetStyles = mockFunctionForResetStyles;

  beforeEach(() => {
    parentNode = document.createElement('div');
    document.body.append(parentNode);
    const orientationBehavior = new OrientationBehavior('horizontal');

    range = new Range({ parentNode, orientationBehavior });
  });

  describe('Create range object', () => {
    test('Should be created an instance of range and not to be undefined', () => {
      const orientationBehavior = new OrientationBehavior('horizontal');
      range = new Range({ parentNode, orientationBehavior });

      expect(range).toBeDefined();
    });

    test('When arguments only 2, should be created with default options', () => {
      const orientationBehavior = new OrientationBehavior('horizontal');
      range = new Range({ parentNode, orientationBehavior });

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

  describe('Destroy dom element', () => {
    test('Should destroy dom element', () => {
      range.destroy();
      const rangeElement = parentNode.getElementsByClassName(Constants.rangeClassName)[0];
      expect(rangeElement).toBeUndefined();
    });
  });
});
