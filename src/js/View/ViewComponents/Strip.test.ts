import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import Strip from './Strip';
import CONSTANTS from '../../Utils/Constants';

let mockGetPositionFromCoordinates = jest.fn();

class OrientationBehavior implements IOrientationBehavior{


    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
        mockGetPositionFromCoordinates()
        return 0;
    }

    resetStyles(runner: HTMLElement): void {
    }

    setPosition(newPosition: number, domElement: HTMLElement): number {
        return 0;
    }

    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
    }
}

describe('Strip class', function(){
    let parentElement: HTMLElement;
    let strip: Strip;


    beforeEach(function() {
        parentElement = document.createElement('div');
        document.body.append(parentElement);
        let orientationBehavior = new OrientationBehavior();
        strip = new Strip(parentElement, orientationBehavior);
    });


    describe('Get orientation behavior', function() {

        test('Should return current orientation behavior object', function(){
            let output = strip.getOrientationBehavior();

            expect(output).toBeInstanceOf(OrientationBehavior);
        });
    });


    describe('Set orientation behavior', function(){
        test('Should  set orientation behavior to input orientation behavior', function(){
            let orientationBehavior = new OrientationBehavior();
            strip.setOrientationBehavior(orientationBehavior);

            expect(strip.getOrientationBehavior()).toEqual(orientationBehavior);
        });
    });

    describe('Add handler', function() {
       test('When click happens, should create and dispatch slider-click event ' +
           'with position computed by orientationBehavior', function() {
           let click = new MouseEvent('click', {
               bubbles: true,
               cancelable: true
           });
           let mockClickHandler = jest.fn();

           parentElement.addEventListener('slider-click', mockClickHandler);
           strip.getDOMNode().dispatchEvent(click);

           expect(mockClickHandler.mock.calls.length).toBe(1);
           expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

           mockClickHandler.mock.calls.length = 0;
           mockGetPositionFromCoordinates.mock.calls.length = 0
       });
       
       test('When click on runner happens, should not react to event ', function() {
           let runner = document.createElement('div');
           runner.classList.add(CONSTANTS.runnerClassName);
           strip.getDOMNode().appendChild(runner);

           let click = new MouseEvent('click', {
               bubbles: true,
               cancelable: true
           });
           let mockClickHandler = jest.fn();

           parentElement.addEventListener('slider-click', mockClickHandler);
           runner.dispatchEvent(click);

           expect(mockClickHandler.mock.calls.length).toBe(0);
           expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(0);
       });
    });

});