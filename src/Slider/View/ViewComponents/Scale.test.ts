import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import Scale from './Scale';
import set = Reflect.set;

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
        let valuesAndPositions = new Map<number, number>();
        valuesAndPositions.set(0, 0).set(50, 50).set(100, 100);
        scale = new Scale(parentElement,
            { orientationBehavior: orientationBehavior, valuesAndPositions: valuesAndPositions });
    });

    describe('Set scale', function() {
        test('Should recreate scale with new values and positions',
            function() {
                let valuesAndPositions = new Map<number, number>();
                valuesAndPositions.set(10, 0).set(300, 30)
                    .set(700, 70).set(1000, 100);
                scale.setScale(valuesAndPositions);
                let firstScaleSubElement = scale.getDOMNode().firstChild as HTMLElement;
                let firstScaleSubElementValue = firstScaleSubElement.innerText;
                let lastScaleSubElement = scale.getDOMNode().lastChild as HTMLElement;
                let lastScaleSubElementValue = lastScaleSubElement.innerText;
                let childAmount = scale.getDOMNode().childNodes.length;

                expect(firstScaleSubElementValue).toBe('10');
                expect(lastScaleSubElementValue).toBe('1000');
                expect(childAmount).toBe(4);
            });
        test('If subElements too close to edge subElement,' +
            'should ignore them', function() {
            let valuesAndPositions = new Map<number, number>();
            valuesAndPositions.set(10, 0).set(300, 30)
                .set(700, 70).set(990, 99).set(1000, 100);

            scale.setScale(valuesAndPositions);

            let firstScaleSubElement = scale.getDOMNode().firstChild as HTMLElement;
            let firstScaleSubElementValue = firstScaleSubElement.innerText;
            let lastScaleSubElement = scale.getDOMNode().lastChild as HTMLElement;
            let lastScaleSubElementValue = lastScaleSubElement.innerText;
            let childAmount = scale.getDOMNode().childNodes.length;

            expect(firstScaleSubElementValue).toBe('10');
            expect(lastScaleSubElementValue).toBe('1000');
            expect(childAmount).toBe(4);
        });
    });


    describe('Recreate scale', function() {
        test('Should recreate scale with old values',
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