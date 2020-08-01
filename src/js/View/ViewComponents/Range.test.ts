import Range from './Range';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import CONSTANTS  from '../../Utils/Constants';


describe('Range class', function(){

    let parentElement: HTMLElement;
    let range: Range;
    let mockFunctionForSetRangePosition = jest.fn();
    let mockFunctionForResetStyles = jest.fn();
    class OrientationBehavior implements IOrientationBehavior{
        getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
            return 0;
        }

        resetStyles(runner: HTMLElement): void {
            mockFunctionForResetStyles();
        }

        setPosition(newPosition: number, domElement: HTMLElement): number {
            return 0;
        }

        setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
            mockFunctionForSetRangePosition();
        }

    }

    beforeEach(function(){
        parentElement = document.createElement('div');
        document.body.append(parentElement);
        let orientationBehavior = new OrientationBehavior();
        range = new Range(parentElement, orientationBehavior);
    });

    describe('Get min edge', function(){
        test('Should return current min edge. Default min edge equal 0', function(){
            expect(range.getMinEdge()).toBe(0);
        });
    });

    describe('Set min edge to input value', function(){
       test('Should correctly set min edge to input value and call setRangePosition method of orientation behavior',
           function() {
           range.setMinEdge(30);

           expect(range.getMinEdge()).toBe(30);
           expect(mockFunctionForSetRangePosition.mock.calls.length).toBe(1);

           mockFunctionForSetRangePosition.mock.calls.length = 0;
       });
    });


    describe('Get max edge', function(){
        test('Should return current max edge. Default max edge equal 100', function(){
            expect(range.getMaxEdge()).toBe(100);
        });
    });

    describe('Set max edge to input value', function(){
        test('Should correctly set max edge to input value and call setRangePosition method of orientation behavior',
            function() {
                range.setMaxEdge(50);

                expect(range.getMaxEdge()).toBe(50);
                expect(mockFunctionForSetRangePosition.mock.calls.length).toBe(1);

                mockFunctionForSetRangePosition.mock.calls.length = 0;
        });
    });

    describe('Get orientation behavior', function(){
        test('Should return current orientation behavior object', function(){
            let output = range.getOrientationBehavior();

            expect(output).toBeInstanceOf(OrientationBehavior);
        });
    });

    describe('Set orientation behavior', function(){
        test('Should  set orientation behavior to input orientation behavior' +
            'and call resetStyles and setRangePositions methods of orientation behavior', function(){
            let orientationBehavior = new OrientationBehavior();
            range.setOrientationBehavior(orientationBehavior);

            expect(range.getOrientationBehavior()).toEqual(orientationBehavior);
            expect(mockFunctionForResetStyles.mock.calls.length).toBe(1);
            expect(mockFunctionForSetRangePosition.mock.calls.length).toBe(1);

            mockFunctionForResetStyles.mock.calls.length = 0;
            mockFunctionForSetRangePosition.mock.calls.length = 0;
        });
    });


    describe('Destroy dom element', function(){
        test('Should destroy dom element', function() {
            range.destroy();
            let rangeElement = parentElement.getElementsByClassName(CONSTANTS.rangeClassName)[0];
            expect(rangeElement).toBeUndefined();
        });
    });
});