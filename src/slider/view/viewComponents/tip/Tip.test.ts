import Tip from './Tip';
import OrientationBehavior from '../../orientationBehaviors/OrientationBehavior';

const mockSetPosition = jest.fn();
const mockFunctionForResetStyles = jest.fn();
OrientationBehavior.prototype.setPosition = mockSetPosition;
OrientationBehavior.prototype.resetStyles = mockFunctionForResetStyles;

describe('Tip class', () => {
  let tip: Tip;
  let parentNode: HTMLElement;
  let orientationBehavior: OrientationBehavior;

  beforeEach(() => {
    parentNode = document.createElement('div');
    document.body.append(parentNode);
    orientationBehavior = new OrientationBehavior('horizontal');
    tip = new Tip({ parentNode, orientationBehavior });
  });

  describe('Create tip object', () => {
    test('Should be created an instance of tip and not to be undefined', () => {
      tip = new Tip({ parentNode, orientationBehavior });
      expect(tip).toBeDefined();
    });

    test('When arguments only 2, should be created with default options', () => {
      tip = new Tip({ parentNode, orientationBehavior });
      expect(tip).toBeDefined();
    });
  });

  describe('Set inner text', () => {
    test('Should set dom element inner text to input string', () => {
      tip.setInnerText('testString');
      expect(tip.getDOMNode().innerHTML).toBe('testString');
    });
  });

  describe('Set position', () => {
    test('Should set dom element position by calling setPosition method of orientation behavior and', () => {
      tip.setPosition(30);
      expect(mockSetPosition.mock.calls.length).toBe(1);
      mockSetPosition.mock.calls.length = 0;
    });
  });
});
