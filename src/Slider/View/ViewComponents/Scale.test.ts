import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import Scale from './Scale';

describe('Scale class', function() {
    let scale: Scale;
    let parentElement: HTMLElement = document.createElement('div');
    document.body.append(parentElement);

    class OrientationBehavior implements IOrientationBehavior {
        getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
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

    beforeEach(function() {
        let orientationBehavior = new OrientationBehavior();
        scale = new Scale(parentElement, { orientationBehavior: orientationBehavior });
    });

    describe('Set scale', function() {
        test('Should recreate scale with new min and max values with current divisions amount',
            function() {
                scale.setScaleEdges(10, 900);
                let firstScaleSubElement = scale.getDOMNode().firstChild as HTMLElement;
                let firstScaleSubElementValue = firstScaleSubElement.innerText;
                let lastScaleSubElement = scale.getDOMNode().lastChild as HTMLElement;
                let lastScaleSubElementValue = lastScaleSubElement.innerText;
                let childAmount = scale.getDOMNode().childNodes.length;

                expect(firstScaleSubElementValue).toBe('10');
                expect(lastScaleSubElementValue).toBe('900');
                expect(childAmount).toBe(2);
            });

        test('When min value >= max value, should throw error', function() {
            expect(() => {
                scale.setScaleEdges(5, 4);
            }).toThrowError();
            ;
        });
    });


    describe('Recreate scale', function() {
        test('Should get a min and max value from current scale and recreate scale with obtained min and max',
            function() {
                let firstScaleSubElement = scale.getDOMNode().firstChild as HTMLElement;
                let firstScaleSubElementValue = firstScaleSubElement.innerText;
                let lastScaleSubElement = scale.getDOMNode().lastChild as HTMLElement;
                let lastScaleSubElementValue = lastScaleSubElement.innerText;
                let childAmount = scale.getDOMNode().childNodes.length;
                scale.reCreateScale();

                expect(firstScaleSubElementValue).toBe((scale.getDOMNode().firstChild as HTMLElement).innerText);
                expect(lastScaleSubElementValue).toBe((scale.getDOMNode().lastChild as HTMLElement).innerText);
                expect(childAmount).toBe(scale.getDOMNode().childNodes.length);
            });
    });

    describe('Get orientation behavior', function() {
        test('Should return current orientation behavior object', function() {
            let output = scale.getOrientationBehavior();

            expect(output).toBeInstanceOf(OrientationBehavior);
        });
    });

    describe('Set orientation behavior', function() {
        test('Should set orientation behavior to input', function() {
            let newOrientationBehavior = new OrientationBehavior();
            scale.setOrientationBehavior(newOrientationBehavior);

            expect(scale.getOrientationBehavior()).toEqual(newOrientationBehavior);
        });
    });


    describe('Get divisions amount', function() {
        test('Should return current divisions amount', function() {
            expect(scale.getDivisionsAmount()).toBe(2);
        });

    });

    describe('Set divisions amount', function() {
        test('Should set divisions amount to input', function() {
            scale.setDivisionsAmount(4);

            expect(scale.getDivisionsAmount()).toBe(4);
        });

        test('When input divisions < 2, should throw error', function() {
            expect(() => {
                scale.setDivisionsAmount(1);
            }).toThrowError();
        });
    });


    describe('Add handler', function() {
        test('When click on child element happens, should generate custom event', function() {
            let click = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            });
            let mockClickHandler = jest.fn();
            scale.getDOMNode().addEventListener('slider-click', mockClickHandler);
            scale.getDOMNode().firstChild.dispatchEvent(click);

            expect(mockClickHandler.mock.calls.length).toBe(1);

            scale.getDOMNode().dispatchEvent(click);

            expect(mockClickHandler.mock.calls.length).toBe(1);

        });
    });


});