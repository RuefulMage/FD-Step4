import Scale from './Scale';
import OrientationBehavior from '../orientationBehaviors/OrientationBehavior';

describe('Scale class', () => {
  let scale: Scale;
  const parentNode: HTMLElement = document.createElement('div');
  document.body.append(parentNode);

  beforeEach(() => {
    const orientationBehavior = new OrientationBehavior('horizontal');
    const valuesAndPositions = new Map<number, number>();
    valuesAndPositions.set(0, 0).set(50, 50).set(100, 100);
    scale = new Scale({ parentNode, orientationBehavior }, valuesAndPositions);
  });

  describe('Set scale', () => {
    test('Should recreate scale with new values and positions',
      () => {
        const valuesAndPositions = new Map<number, number>();
        valuesAndPositions.set(10, 0).set(300, 30)
          .set(700, 70).set(1000, 100);
        scale.setScale(valuesAndPositions);
        const firstScaleSubElement = scale.getDOMNode().firstChild as HTMLElement;
        const firstScaleSubElementValue = firstScaleSubElement.innerText;
        const lastScaleSubElement = scale.getDOMNode().lastChild as HTMLElement;
        const lastScaleSubElementValue = lastScaleSubElement.innerText;
        const childAmount = scale.getDOMNode().childNodes.length;

        expect(firstScaleSubElementValue).toBe('10');
        expect(lastScaleSubElementValue).toBe('1000');
        expect(childAmount).toBe(4);
      });

    test('If subElements too close to edge subElement,'
      + 'should ignore them', () => {
      const valuesAndPositions = new Map<number, number>();
      valuesAndPositions.set(10, 0).set(300, 30)
        .set(700, 70).set(990, 99)
        .set(1000, 100);
      scale.setScale(valuesAndPositions);
      const firstScaleSubElement = scale.getDOMNode().firstChild as HTMLElement;
      const firstScaleSubElementValue = firstScaleSubElement.innerText;
      const lastScaleSubElement = scale.getDOMNode().lastChild as HTMLElement;
      const lastScaleSubElementValue = lastScaleSubElement.innerText;
      const childAmount = scale.getDOMNode().childNodes.length;

      expect(firstScaleSubElementValue).toBe('10');
      expect(lastScaleSubElementValue).toBe('1000');
      expect(childAmount).toBe(4);
    });
  });

  describe('Recreate scale', () => {
    test('Should recreate scale with old values',
      () => {
        const firstScaleSubElement = scale.getDOMNode().firstChild as HTMLElement;
        const firstScaleSubElementValue = firstScaleSubElement.innerText;
        const lastScaleSubElement = scale.getDOMNode().lastChild as HTMLElement;
        const lastScaleSubElementValue = lastScaleSubElement.innerText;
        const childAmount = scale.getDOMNode().childNodes.length;
        scale.reCreateScale();

        expect(firstScaleSubElementValue)
          .toBe((scale.getDOMNode().firstChild as HTMLElement).innerText);
        expect(lastScaleSubElementValue)
          .toBe((scale.getDOMNode().lastChild as HTMLElement).innerText);
        expect(childAmount).toBe(scale.getDOMNode().childNodes.length);
      });
  });

  describe('Add handler', () => {
    test('When click on child element happens, should generate custom event', () => {
      const click = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      const mockClickHandler = jest.fn();
      scale.getDOMNode().addEventListener('slider-click', mockClickHandler);
      scale.getDOMNode().firstChild.dispatchEvent(click);
      expect(mockClickHandler.mock.calls.length).toBe(1);

      scale.getDOMNode().dispatchEvent(click);
      expect(mockClickHandler.mock.calls.length).toBe(1);
    });
  });
});
