import Constants from '../../utils/constants';
import Tip from './Tip';
import OrientationBehavior from '../orientationBehaviors/OrientationBehavior';
import { Orientation } from '../../utils/types';

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
    tip = new Tip({ parentNode, orientationBehavior }, true);
  });

  describe('Create tip object', () => {
    test('Should be created an instance of tip and not to be undefined', () => {
      tip = new Tip({ parentNode, orientationBehavior }, false);

      expect(tip).toBeDefined();
    });

    test('When arguments only 2, should be created with default options', () => {
      tip = new Tip({ parentNode, orientationBehavior }, true);

      expect(tip).toBeDefined();
      expect(tip.getHideStatus()).toBe(true);
    });
  });

  describe('Set inner text', () => {
    test('Should set dom element inner text to input string', () => {
      tip.setInnerText('testString');

      expect(tip.getDOMNode().innerHTML).toBe('testString');
    });
  });

  describe('isHidden method', () => {
    test('Should return current hidden state. If true - hidden, false - showed', () => {
      expect(tip.getHideStatus()).toBe(true);
    });
  });

  describe('Set position', () => {
    test('Should set dom element position by calling setPosition method of orientation behavior and', () => {
      tip.setPosition(30);

      expect(mockSetPosition.mock.calls.length).toBe(1);

      mockSetPosition.mock.calls.length = 0;
    });
  });
  describe('Show tip', () => {
    test('Should show tip by adding css class for hiding from Constants object and set isHidden flag to false',
      () => {
        const showedTip = new Tip({ parentNode, orientationBehavior }, false);
        showedTip.show();

        expect(showedTip.getDOMNode().classList.contains(Constants.tipHiddenClassName)).toBe(false);
        expect(showedTip.getHideStatus()).toBe(false);

        const hiddenTip = new Tip({ parentNode, orientationBehavior }, true);
        hiddenTip.show();

        expect(hiddenTip.getDOMNode().classList.contains(Constants.tipHiddenClassName)).toBe(false);
        expect(hiddenTip.getHideStatus()).toBe(false);
      });
  });

  describe('Hide tip', () => {
    test('Should hide tip by adding css class for hiding from Constants object and set isHidden flag to true',
      () => {
        const showedTip = new Tip({ parentNode, orientationBehavior }, false);
        showedTip.hide();

        expect(showedTip.getDOMNode().classList.contains(Constants.tipHiddenClassName)).toBe(true);
        expect(showedTip.getHideStatus()).toBe(true);

        const hiddenTip = new Tip({ parentNode, orientationBehavior }, true);
        hiddenTip.hide();

        expect(hiddenTip.getDOMNode().classList.contains(Constants.tipHiddenClassName)).toBe(true);
        expect(hiddenTip.getHideStatus()).toBe(true);
      });
  });
});
