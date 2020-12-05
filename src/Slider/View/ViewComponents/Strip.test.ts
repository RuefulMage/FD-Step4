// import CONSTANTS from '../../Utils/Constants';
// import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
// import Strip from './Strip';
//
// const mockGetPositionFromCoordinates = jest.fn();
//
// class OrientationBehavior implements IOrientationBehavior {
//   // eslint-disable-next-line class-methods-use-this
//   getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
//     mockGetPositionFromCoordinates();
//     return 0;
//   }
//
//   // eslint-disable-next-line class-methods-use-this
//   resetStyles(runner: HTMLElement): void {
//   }
//
//   // eslint-disable-next-line class-methods-use-this
//   setPosition(newPosition: number, domElement: HTMLElement): number {
//     return 0;
//   }
//
//   // eslint-disable-next-line class-methods-use-this
//   setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
//   }
// }
//
// describe('Strip class', () => {
//   let parentElement: HTMLElement;
//   let strip: Strip;
//
//   beforeEach(() => {
//     parentElement = document.createElement('div');
//     document.body.append(parentElement);
//     const orientationBehavior = new OrientationBehavior();
//     strip = new Strip(parentElement, orientationBehavior);
//   });
//
//   describe('Get orientation behavior', () => {
//     test('Should return current orientation behavior object', () => {
//       const output = strip.getOrientationBehavior();
//
//       expect(output).toBeInstanceOf(OrientationBehavior);
//     });
//   });
//
//   describe('Set orientation behavior', () => {
//     test('Should  set orientation behavior to input orientation behavior', () => {
//       const orientationBehavior = new OrientationBehavior();
//       strip.setOrientationBehavior(orientationBehavior);
//
//       expect(strip.getOrientationBehavior()).toEqual(orientationBehavior);
//     });
//   });
//
//   describe('Add handler', () => {
//     test('When click happens, should create and dispatch slider-click event '
//             + 'with position computed by orientationBehavior', () => {
//       const click = new MouseEvent('mousedown', {
//         bubbles: true,
//         cancelable: true,
//       });
//       const mockClickHandler = jest.fn();
//
//       parentElement.addEventListener('slider-click', mockClickHandler);
//       strip.getDOMNode().dispatchEvent(click);
//
//       expect(mockClickHandler.mock.calls.length).toBe(1);
//       expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);
//
//       mockClickHandler.mock.calls.length = 0;
//       mockGetPositionFromCoordinates.mock.calls.length = 0;
//     });
//
//     test('When click on runner happens, should not react to event ', () => {
//       const runner = document.createElement('div');
//       runner.classList.add(CONSTANTS.runnerClassName);
//       strip.getDOMNode().appendChild(runner);
//
//       const click = new MouseEvent('mousedown', {
//         bubbles: true,
//         cancelable: true,
//       });
//       const mockClickHandler = jest.fn();
//
//       parentElement.addEventListener('slider-click', mockClickHandler);
//       runner.dispatchEvent(click);
//
//       expect(mockClickHandler.mock.calls.length).toBe(0);
//       expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(0);
//     });
//   });
// });
