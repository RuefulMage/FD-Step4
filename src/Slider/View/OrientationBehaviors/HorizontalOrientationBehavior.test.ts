import HorizontalOrientationBehavior from './HorizontalOrientationBehavior';

describe('Horizontal orientation behavior class', () => {
  let parentElement: HTMLElement;
  let domElement: HTMLElement;
  let horizontalOrientationBehavior: HorizontalOrientationBehavior;
  beforeEach(() => {
    parentElement = document.createElement('div');
    Object.defineProperties(parentElement, {
      offsetWidth: {
        get() {
          return 100;
        },
      },
      getBoundingClientRect: {
        get() {
          return function () {
            return {
              left: 10,
              right: 15,
            };
          };
        },
      },
    });
    document.body.append(parentElement);
    domElement = document.createElement('div');
    Object.defineProperties(domElement, {
      offsetWidth: {
        get() {
          return 40;
        },
      },
    });
    parentElement.appendChild(domElement);
    horizontalOrientationBehavior = new HorizontalOrientationBehavior();
  });

  describe('Set position', () => {
    test('Should shift input position to half of element width and set left attribute of '
            + 'input DOM element to shifted position', () => {
      const inputPosition = 10;
      horizontalOrientationBehavior.setPosition(inputPosition, domElement);

      expect(domElement.style.left).toBe('-10%');
    });
  });

  describe('Get position from coordinates', () => {
    test('Should return correct position in percents', () => {
      const clientX = 30;
      const clientY = 40;

      const outputPosition = horizontalOrientationBehavior
        .getPositionFromCoordinates(clientX, clientY, domElement);

      expect(outputPosition).toBe(20);
    });

    test('Should throw Error, when clientX bigger than window width', () => {
      const clientX = window.innerWidth + 10;
      const clientY = 40;

      expect(() => {
        horizontalOrientationBehavior
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

      horizontalOrientationBehavior.resetStyles(element);

      expect(element.getAttribute('style')).toBe('');
    });
  });

  describe('Set range position', () => {
    test('Should set styles of element to input left and right position', () => {
      const minEdge = 20;
      const maxEdge = 65;
      horizontalOrientationBehavior.setRangePositions(minEdge, maxEdge, domElement);

      expect(domElement.style.left).toBe('20%');
      expect(domElement.style.right).toBe('35%');
    });
  });
});
