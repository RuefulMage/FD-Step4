import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import Runner from './Runner';

describe('Runner class', function(){
    let parentElement: HTMLElement;
    let runner: Runner;
    let mockGetPositionFromCoordinates = jest.fn();
    let mockSetPosition = jest.fn();
    let mockFunctionForResetStyles = jest.fn();

    class OrientationBehavior implements IOrientationBehavior{
        getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
            mockGetPositionFromCoordinates();
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


    beforeEach(function() {
        parentElement = document.createElement('div');
        document.body.appendChild(parentElement);
        let orientationBehavior = new OrientationBehavior();
        runner = new Runner(parentElement, orientationBehavior);
        mockSetPosition.mock.calls.length = 0;
    });

    afterEach(function() {
        mockSetPosition.mock.calls.length = 0;
    });


    describe('Create range object', function() {
        test('Should be created an instance of range and not to be undefined', () => {
            let orientationBehavior = new OrientationBehavior();
            let runner = new Runner(parentElement, orientationBehavior, 0);

            expect(runner).toBeDefined();
        });

        test('When arguments only 2, should be created with default options', () => {
            let orientationBehavior = new OrientationBehavior();
            let runner = new Runner(parentElement, orientationBehavior);

            expect(runner).toBeDefined();
        })

    });


    describe('Get position', function() {
        test('Should return current position. Default position equal 0', function() {
            expect(runner.getPosition()).toBe(0);
        });
    })

    describe('Set position', function() {
        test('Set position to input position and call setPosition method od orientation behavior', function(){
            runner.setPosition(40);

            expect(runner.getPosition()).toBe(40);
            expect(mockSetPosition.mock.calls.length).toBe(1);

            mockSetPosition.mock.calls.length = 0;
        });
    });

    describe('Get orientation behavior', function() {
        test('Should return current orientation behavior object', function(){
            let output = runner.getOrientationBehavior();

            expect(output).toBeInstanceOf(OrientationBehavior);
        });
    });


    describe('Set orientation behavior', function(){
        test('Should  set orientation behavior to input orientation behavior' +
            'and call resetStyles method of orientation behavior', function(){
            let orientationBehavior = new OrientationBehavior();
            runner.setOrientationBehavior(orientationBehavior);

            expect(runner.getOrientationBehavior()).toEqual(orientationBehavior);
            expect(mockFunctionForResetStyles.mock.calls.length).toBe(1);

            mockFunctionForResetStyles.mock.calls.length = 0;
        });
    });


    describe('Destroy dom element', function(){
        test('Should destroy dom element', function() {
            runner.destroy();
            let runnerElement = parentElement.getElementsByClassName(CONSTANTS.runnerClassName)[0];

            expect(runnerElement).toBeUndefined();
        });
    });
    
    
    describe('Add mouse event listeners', function() {
        test('When mousedown and mousemove happen, should call getPositionFromCoordinates of orientation behavior ' +
            'and generate custom event slider-drag and after mouseup behavior not calling',
            function() {

            let mousedown = new MouseEvent('mousedown');
            let dragstart = new Event('dragstart');
            let mousemove = new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                clientX: 100,
                clientY: 100
            });
            let mockEventHandler = jest.fn();
            parentElement.addEventListener('slider-drag', mockEventHandler);
            runner.getDOMNode().dispatchEvent(mousedown);
            runner.getDOMNode().dispatchEvent(dragstart);
            runner.getDOMNode().dispatchEvent(mousemove);

            expect(mockEventHandler.mock.calls.length).toBe(1);
            expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

            let mouseup = new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                clientX: 100,
                clientY: 100
            });
            runner.getDOMNode().dispatchEvent(mouseup);
            runner.getDOMNode().dispatchEvent(mousemove);

            expect(mockEventHandler.mock.calls.length).toBe(1);
            expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

            mockGetPositionFromCoordinates.mock.calls.length = 0;

        });

    });

    describe('Add touch event listeners', function() {
        test('When touchstart and touchmove happen, should call getPositionFromCoordinates of orientation behavior ' +
            'and generate custom event slider-drag and after mouseup behavior not calling',
            function() {

                let touchStart = new TouchEvent('touchstart');
                let dragstart = new Event('dragstart');

                let touch = {clientY: 100, clientX: 100} as Touch;
                let touchMove = new TouchEvent('touchmove', {
                    bubbles: true,
                    cancelable: true,
                    targetTouches: [touch]
                });

                let mockTouchEventHandler = jest.fn();
                parentElement.addEventListener('slider-drag', mockTouchEventHandler);
                runner.getDOMNode().dispatchEvent(touchStart);
                runner.getDOMNode().dispatchEvent(dragstart);
                runner.getDOMNode().dispatchEvent(touchMove);

                expect(mockTouchEventHandler.mock.calls.length).toBe(1);
                expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

                let touchEndEvent: TouchEventInit = {
                    bubbles: true,
                    cancelable: true,
                    clientX: 100,
                    clientY: 100
                } as TouchEventInit;

                let touchEnd = new TouchEvent('touchend', touchEndEvent);
                runner.getDOMNode().dispatchEvent(touchEnd);
                runner.getDOMNode().dispatchEvent(touchMove);

                expect(mockTouchEventHandler.mock.calls.length).toBe(1);
                expect(mockGetPositionFromCoordinates.mock.calls.length).toBe(1);

                mockGetPositionFromCoordinates.mock.calls.length = 0;

            });

    });
});