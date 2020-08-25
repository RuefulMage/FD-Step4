import HorizontalOrientationBehavior from './HorizontalOrientationBehavior';

describe('Horizontal orientation behavior class', function() {

    let parentElement: HTMLElement;
    let domElement: HTMLElement;
    let horizontalOrientationBehavior: HorizontalOrientationBehavior;
    beforeEach(function() {
        parentElement = document.createElement('div');
        Object.defineProperties(parentElement, {
            offsetWidth: {
                get() {
                    return 100;
                },
            },
            getBoundingClientRect: {
                get() {
                    return function() {
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

    describe('Set position', function() {
        test('Should shift input position to half of element width and set left attribute of ' +
            'input DOM element to shifted position', function() {
            let inputPosition = 10;
            horizontalOrientationBehavior.setPosition(inputPosition, domElement);

            expect(domElement.style.left).toBe('-10%');
        });
    });

    describe('Get position from coordinates', function() {
        test('Should return correct position in percents', function() {
            let clientX = 30;
            let clientY = 40;

            let outputPosition = horizontalOrientationBehavior.getPositionFromCoordinates(clientX, clientY, domElement);

            expect(outputPosition).toBe(20);
        });
    });


    describe('Reset styles', function() {
        test('Should clean style attribute of dom element', function() {
            let element = document.createElement('div');
            element.style.width = '100px';
            element.style.height = '200px';
            element.style.left = '10%';
            element.style.top = '20%';

            horizontalOrientationBehavior.resetStyles(element);

            expect(element.getAttribute('style')).toBe('');
        });
    });

    describe('Set range position', function() {
        test('Should set styles of element to input left and right position', function() {
            let minEdge = 20;
            let maxEdge = 65;
            horizontalOrientationBehavior.setRangePositions(minEdge, maxEdge, domElement);

            expect(domElement.style.left).toBe('20%');
            expect(domElement.style.right).toBe('35%');

        });
    });
});