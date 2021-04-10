import OrientationBehavior from './OrientationBehavior';
import { Orientation } from '../../utils/types';

describe('OrientationBehavior class', () => {
  let orientationBehavior: OrientationBehavior;
  let parentElement: HTMLElement;
  let domElement: HTMLElement;

  beforeEach(() => {
    parentElement = document.createElement('div');
    Object.defineProperties(parentElement, {
      offsetHeight: {
        get() {
          return 100;
        },
      },
      offsetWidth: {
        get() {
          return 100;
        },
      },
      getBoundingClientRect: {
        // eslint-disable-next-line fsd/hof-name-prefix
        get() {
          return function () {
            return {
              top: 10,
              bottom: 15,
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
      offsetHeight: {
        get() {
          return 40;
        },
      },
      offsetWidth: {
        get() {
          return 40;
        },
      },
    });
    parentElement.appendChild(domElement);

    orientationBehavior = new OrientationBehavior(Orientation.HORIZONTAL);
  });

  describe('Get orientation', () => {
    test('Should get current orientation', () => {
      expect(orientationBehavior.getOrientation()).toBe(Orientation.HORIZONTAL);
    });
  });

  describe('Set orientation', () => {
    test('Should change orientation to input value', () => {
      orientationBehavior.setOrientation(Orientation.VERTICAL);

      expect(orientationBehavior.getOrientation()).toBe(Orientation.VERTICAL);

      orientationBehavior.setOrientation(Orientation.HORIZONTAL);

      expect(orientationBehavior.getOrientation()).toBe(Orientation.HORIZONTAL);
    });
  });

  describe('Set Position', () => {
    test('Should shift input position to half of element width and set left attribute of '
      + 'input DOM element to shifted position, when orientation is horizontal', () => {
      const inputPosition = 10;
      orientationBehavior.setPosition(inputPosition, domElement);

      expect(domElement.style.left).toBe('-10%');
    });

    test('Should shift input position to half of element height and set bottom attribute of '
      + 'input DOM element to shifted position, when orientation is vertical', () => {
      const inputPosition = 10;

      orientationBehavior.setOrientation(Orientation.VERTICAL);
      orientationBehavior.setPosition(inputPosition, domElement);

      expect(domElement.style.bottom).toBe('-10%');
    });
  });

  describe('Get position from coordinates', () => {
    test('Should return correct position in percents, when orientation is horizontal', () => {
      const clientX = 30;
      const clientY = 40;

      const outputPosition = orientationBehavior
        .getPositionFromCoordinates(clientX, clientY, domElement);

      expect(outputPosition).toBe(20);
    });

    test('Should return correct position in percents, when orientation is vertical', () => {
      const clientX = 30;
      const clientY = 40;

      orientationBehavior.setOrientation(Orientation.VERTICAL);
      const outputPosition = orientationBehavior
        .getPositionFromCoordinates(clientX, clientY, domElement);

      expect(outputPosition).toBe(70);
    });

    test('Should throw Error, when clientX or clientY are too big', () => {
      let clientX = window.innerWidth + 10;
      let clientY = 40;

      expect(() => {
        orientationBehavior
          .getPositionFromCoordinates(clientX, clientY, domElement);
      }).toThrowError();

      clientX = 10;
      clientY = window.innerHeight + 10;

      expect(() => {
        orientationBehavior
          .getPositionFromCoordinates(clientX, clientY, domElement);
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

      orientationBehavior.resetStyles(element);

      expect(element.getAttribute('style')).toBe('');
    });
  });

  describe('Set range position', () => {
    test('Should set styles of element to input left and right position, when orientation is horizontal', () => {
      const minEdge = 20;
      const maxEdge = 65;
      orientationBehavior.setRangePositions(minEdge, maxEdge, domElement);

      expect(domElement.style.left).toBe('20%');
      expect(domElement.style.right).toBe('35%');
    });

    test('Should set styles of element to input left and right position, when orientation is vertical', () => {
      const minEdge = 20;
      const maxEdge = 65;
      orientationBehavior.setOrientation(Orientation.VERTICAL);
      orientationBehavior.setRangePositions(minEdge, maxEdge, domElement);

      expect(domElement.style.top).toBe('35%');
      expect(domElement.style.bottom).toBe('20%');
    });
  });
});
