import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import Tip from './Tip';

const mockSetPosition = jest.fn();
const mockFunctionForResetStyles = jest.fn();

class OrientationBehavior implements IOrientationBehavior {
  getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
    return 0;
  }

  resetStyles(runner: HTMLElement): void {
    mockFunctionForResetStyles();
  }

  setPosition(newPosition: number, domElement: HTMLElement): number {
    mockSetPosition();
    return 0;
  }

  setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
  }
}

describe('Tip class', () => {
  let tip: Tip;
  let parentElement: HTMLElement;
  let orientationBehavior: OrientationBehavior;

  beforeEach(() => {
    parentElement = document.createElement('div');
    document.body.append(parentElement);
    orientationBehavior = new OrientationBehavior();
    tip = new Tip(parentElement, orientationBehavior);
  });

  describe('Get orientation behavior', () => {
    describe('Create tip object', () => {
      test('Should be created an instance of tip and not to be undefined', () => {
        orientationBehavior = new OrientationBehavior();
        tip = new Tip(parentElement, orientationBehavior, false);

        expect(tip).toBeDefined();
      });

      test('When arguments only 2, should be created with default options', () => {
        orientationBehavior = new OrientationBehavior();
        tip = new Tip(parentElement, orientationBehavior);

        expect(tip).toBeDefined();
        expect(tip.getHideStatus()).toBe(true);
      });
    });

    test('Should return current orientation behavior object', () => {
      const output = tip.getOrientationBehavior();

      expect(output).toBeInstanceOf(OrientationBehavior);
    });
  });

  describe('Set orientation behavior', () => {
    test('Should  set orientation behavior to input orientation behavior'
            + 'and call resetStyles method of orientation behavior', () => {
      orientationBehavior = new OrientationBehavior();
      tip.setOrientationBehavior(orientationBehavior);

      expect(tip.getOrientationBehavior()).toEqual(orientationBehavior);
      expect(mockFunctionForResetStyles.mock.calls.length).toBe(1);

      mockFunctionForResetStyles.mock.calls.length = 0;
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
    test('Should show tip by adding css class for hiding from CONSTANTS object and set isHidden flag to false',
      () => {
        orientationBehavior = new OrientationBehavior();
        const showedTip = new Tip(parentElement, orientationBehavior, false);
        showedTip.show();

        expect(showedTip.getDOMNode().classList.contains(CONSTANTS.tipHiddenClassName)).toBe(false);
        expect(showedTip.getHideStatus()).toBe(false);

        const hiddenTip = new Tip(parentElement, orientationBehavior, true);
        hiddenTip.show();

        expect(hiddenTip.getDOMNode().classList.contains(CONSTANTS.tipHiddenClassName)).toBe(false);
        expect(hiddenTip.getHideStatus()).toBe(false);
      });
  });

  describe('Hide tip', () => {
    test('Should hide tip by adding css class for hiding from CONSTANTS object and set isHidden flag to true',
      () => {
        orientationBehavior = new OrientationBehavior();
        const showedTip = new Tip(parentElement, orientationBehavior, false);
        showedTip.hide();

        expect(showedTip.getDOMNode().classList.contains(CONSTANTS.tipHiddenClassName)).toBe(true);
        expect(showedTip.getHideStatus()).toBe(true);

        const hiddenTip = new Tip(parentElement, orientationBehavior, true);
        hiddenTip.hide();

        expect(hiddenTip.getDOMNode().classList.contains(CONSTANTS.tipHiddenClassName)).toBe(true);
        expect(hiddenTip.getHideStatus()).toBe(true);
      });
  });
});
