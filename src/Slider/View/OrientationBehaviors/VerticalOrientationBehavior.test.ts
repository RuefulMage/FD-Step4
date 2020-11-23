import VerticalOrientationBehavior from './VerticalOrientationBehavior';

describe('Horizontal orientation behavior class', () => {
  let parentElement: HTMLElement;
  let domElement: HTMLElement;
  let verticalOrientationBehavior: VerticalOrientationBehavior;
  beforeEach(() => {
    parentElement = document.createElement('div');
    Object.defineProperties(parentElement, {
      offsetHeight: {
        get() {
          return 100;
        },
      },
      getBoundingClientRect: {
        get() {
          return function () {
            return {
              top: 10,
              bottom: 15,
            };
          };
        },
      },
    });
    document.body.append(parentElement);
    domElement = document.createElement('div');
    Object.defineProperties(domElement, {
      offsetHeight: {
        get() {
          return 40;
        },
      },
    });
    parentElement.appendChild(domElement);

    verticalOrientationBehavior = new VerticalOrientationBehavior();
  });

  describe('Set position', () => {
    test('Should shift input position to half of element height and set bottom attribute of '
            + 'input DOM element to shifted position', () => {
      const inputPosition = 10;
      verticalOrientationBehavior.setPosition(inputPosition, domElement);

      expect(domElement.style.bottom).toBe('-10%');
    });
  });

  describe('Get position from coordinates', () => {
    test('Should return correct position in percents', () => {
      const clientX = 30;
      const clientY = 40;

      const outputPosition = verticalOrientationBehavior
        .getPositionFromCoordinates(clientX, clientY, domElement);

      expect(outputPosition).toBe(70);
    });

    test('Should throw Error, when clientY bigger than window height', () => {
      const clientX = 30;
      const clientY = window.innerHeight + 10;

      expect(() => {
        verticalOrientationBehavior
          .getPositionFromCoordinates(clientX, clientY, domElement)
      }).toThrowError();
    });
  });

  describe('Reset styles', () => {
    test('Should clean style attribute of dom element', () => {
      const element = document.createElement('div');
      element.style.width = '100px';
      element.style.height = '200px';
      element.style.left = '10%';
      element.style.top = '20%';

      verticalOrientationBehavior.resetStyles(element);

      expect(element.getAttribute('style')).toBe('');
    });
  });

  describe('Set range position', () => {
    test('Should set styles of element to input left and right position', () => {
      const minEdge = 20;
      const maxEdge = 65;
      verticalOrientationBehavior.setRangePositions(minEdge, maxEdge, domElement);

      expect(domElement.style.top).toBe('35%');
      expect(domElement.style.bottom).toBe('20%');
    });
  });
});
