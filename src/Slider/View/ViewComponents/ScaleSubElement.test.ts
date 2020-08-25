import ScaleSubElement from './ScaleSubElement';

describe('Scale subelement class', function() {
    let scaleSubElement: ScaleSubElement;
    let parentElement;

    beforeEach(function() {
        parentElement = document.createElement('div');
        document.body.append(parentElement);
        scaleSubElement = new ScaleSubElement(parentElement, 10);
    });

    describe('Get position', function() {
        test('Should return current position', function() {
            expect(scaleSubElement.getPosition()).toBe(10);
        });
    });

    describe('Set position', function() {
        test('Should set position to input value and set attribute data-scale-position to new position',
            function() {
                scaleSubElement.setPosition(60);

                expect(scaleSubElement.getPosition()).toBe(60);
                expect(scaleSubElement.getDOMNode().getAttribute('data-scale-position')).toBe('60');
            });
    });
});