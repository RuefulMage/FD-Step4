import VerticalOrientationBehavior from './VerticalOrientationBehavior';


describe('Horizontal orientation behavior class', function() {
    let parentElement: HTMLElement;
    let domElement: HTMLElement;
    let verticalOrientationBehavior: VerticalOrientationBehavior;
    beforeEach(function() {
        parentElement = document.createElement('div');
        Object.defineProperties(parentElement, {
            offsetHeight: {
                get() {
                    return 100;
                }
            },
            getBoundingClientRect: {
                get() {
                    return function() {
                        return {
                            top: 10,
                            bottom: 15
                        };
                    }
                }
            }
        });
        document.body.append(parentElement);
        domElement = document.createElement('div');
        Object.defineProperties(domElement, {
            offsetHeight: {
                get() { return 40}
            }
        });
        parentElement.appendChild(domElement);

        verticalOrientationBehavior = new VerticalOrientationBehavior();
    });

    describe('Set position', function() {
        test('Should shift input position to half of element height and set bottom attribute of ' +
            'input DOM element to shifted position', function() {
            let inputPosition = 10;
            verticalOrientationBehavior.setPosition(inputPosition, domElement);

            expect(domElement.style.bottom).toBe('-10%');
        });
    });

    describe('Get position from coordinates', function(){
        test('Should return correct position in percents', function(){
            let clientX = 30;
            let clientY = 40;

            let outputPosition = verticalOrientationBehavior.getPositionFromCoordinates(clientX, clientY, domElement);

            expect(outputPosition).toBe(70);
        });
    });


    describe('Reset styles', function() {
        test('Should clean style attribute of dom element', function(){
            let element = document.createElement('div');
            element.style.width = '100px';
            element.style.height = '200px';
            element.style.left = '10%';
            element.style.top = '20%';

            verticalOrientationBehavior.resetStyles(element);

            expect(element.getAttribute('style')).toBe('');
        });
    });

    describe('Set range position', function(){
        test('Should set styles of element to input left and right position', function(){
            let minEdge = 20;
            let maxEdge = 65;
            verticalOrientationBehavior.setRangePositions(minEdge, maxEdge, domElement);

            expect(domElement.style.top).toBe('35%');
            expect(domElement.style.bottom).toBe('20%');

        });
    });
});