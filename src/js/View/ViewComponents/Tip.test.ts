import Tip from './Tip';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import CONSTANTS from '../../Utils/Constants';

let mockSetPosition = jest.fn();
let mockFunctionForResetStyles = jest.fn();

class OrientationBehavior implements IOrientationBehavior{


    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
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

describe('Tip class', function(){
    let tip: Tip;
    let parentElement: HTMLElement;


    beforeEach(function() {
        parentElement = document.createElement('div');
        document.body.append(parentElement);
        let orientationBehavior = new OrientationBehavior();
        let isHidden = true;
        let isBelow = true;
        tip = new Tip(parentElement, orientationBehavior, isHidden, isBelow);
    });


    describe('Get orientation behavior', function() {

        test('Should return current orientation behavior object', function(){
            let output = tip.getOrientationBehavior();

            expect(output).toBeInstanceOf(OrientationBehavior);
        });
    });


    describe('Set orientation behavior', function(){
        test('Should  set orientation behavior to input orientation behavior' +
            'and call resetStyles method of orientation behavior', function(){
            let orientationBehavior = new OrientationBehavior();
            tip.setOrientationBehavior(orientationBehavior);

            expect(tip.getOrientationBehavior()).toEqual(orientationBehavior);
            expect(mockFunctionForResetStyles.mock.calls.length).toBe(1);

            mockFunctionForResetStyles.mock.calls.length = 0;
        });
    });


    describe('Set inner text', function() {
        test('Should set dom element inner text to input string', function() {
            tip.setInnerText('testString');

            expect(tip.getDOMNode().innerText).toBe('testString');
        });
    });

    describe('isHidden method', function() {
        test('Should return current hidden state. If true - hidden, false - showed', function() {
           expect(tip.getHideStatus()).toBe(true);
        });
    });


    describe('Set position', function() {
        test('Should set dom element position by calling setPosition method of orientation behavior and', function() {
           tip.setPosition(30);

           expect(mockSetPosition.mock.calls.length).toBe(1);

            mockSetPosition.mock.calls.length = 0;
        });
    });
    describe('Show tip', function() {
        test('Should show tip by adding css class for hiding from CONSTANTS object and set isHidden flag to false',
            function() {
            tip.show();

            expect(tip.getDOMNode().classList.contains(CONSTANTS.tipHiddenClassName)).toBe(false);
            expect(tip.getHideStatus()).toBe(false);
        });

    })


    describe('Hide tip', function() {
        test('Should hide tip by adding css class for hiding from CONSTANTS object and set isHidden flag to true',
            function() {
                tip.show();
                tip.hide();

                expect(tip.getDOMNode().classList.contains(CONSTANTS.tipHiddenClassName)).toBe(true);
                expect(tip.getHideStatus()).toBe(true);
            });
    });

});