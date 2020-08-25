import CONSTANTS from '../../Utils/Constants';
import IObserver from '../../Observer/IObserver';
import Orientation from '../../Utils/Orientation';
import View from './View';

let mockUpdate = jest.fn();

class Observer implements IObserver {
    update(eventName: string, data?: any): void {
        mockUpdate(eventName, data);
    }
}

describe('View class', function() {
    let parentElement: HTMLElement;
    let view: View;
    let options: {
        divisionsAmount: number,
        isRange: boolean,
        isTipsHidden: boolean,
        maxValue: number,
        minValue: number,
        orientation: Orientation
    };

    beforeEach(function() {
        options = {
            divisionsAmount: 2,
            isRange: true,
            isTipsHidden: true,
            maxValue: 100,
            minValue: 0,
            orientation: Orientation.HORIZONTAL,
        };

        parentElement = document.createElement('div');
        document.body.append(parentElement);

    });


    describe('Create view', function() {
        test('Should create view with range', function() {
            options.isRange = true;
            view = new View(parentElement, options);
            let runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;

            expect(runnersAmount).toBe(2);
        });

        test('Should create view with one runner', function() {
            options.isRange = false;
            view = new View(parentElement, options);
            let runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;

            expect(runnersAmount).toBe(1);
        });

        test('When options is empty, should create view with default values', function() {
            let options = {};
            view = new View(parentElement, options);

            expect(view).toBeDefined();
        });
    });


    describe('Get runner position', function() {
        test('Should return current runner position. Default position is 0.', function() {
            options.isRange = true;
            let view = new View(parentElement, options);

            expect(view.getRunnerPosition(0)).toBe(0);
        });


        test('When runner with with index does not exists, should throw Error', function() {
            let view = new View(parentElement, options);

            expect(() => {
                view.getRunnerPosition(3);
            }).toThrowError();

            expect(() => {
                view.getRunnerPosition(-1);
            }).toThrowError();
        });
    });

    describe('Set runner position', function() {
        test('Should set runner position',
            function() {
                let view = new View(parentElement, options);
                view.setRunnerPosition(0, 60);
                let expectedRunnerPosition = view.getRunnerPosition(0);

                expect(expectedRunnerPosition).toBe(60);
            });

        test('When runner with with index does not exists, should throw Error', function() {
            let view = new View(parentElement, options);

            expect(() => {
                view.setRunnerPosition(3, 90);
            }).toThrowError();

            expect(() => {
                view.setRunnerPosition(-1, 80);
            }).toThrowError();
        });
    });

    describe('Set range', function() {
        test('Should set range min and max edges', function() {
            let view = new View(parentElement, options);
            view.setRange(30, 60);
            let rangeNode = view.getDOMNode().getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
            let minEdge = parseFloat(rangeNode.style.left);
            let maxEdge = 100 - parseFloat(rangeNode.style.right);

            expect(minEdge).toBe(30);
            expect(maxEdge).toBe(60);
        });
    });

    describe('Change mode to range', function() {
        test('Should create runner and tip and change range position', function() {
            options.isRange = false;
            let view = new View(parentElement, options);
            view.changeModeToRange(80, 80);
            let runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;
            let tipsAmount = parentElement.getElementsByClassName(CONSTANTS.tipClassName).length;

            expect(runnersAmount).toBe(2);
            expect(tipsAmount).toBe(2);

            let lowRunnerPosition = view.getRunnerPosition(0);
            let highRunnerPosition = view.getRunnerPosition(1);
            let rangeNode = view.getDOMNode().getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
            let minEdge = parseFloat(rangeNode.style.left);
            let maxEdge = 100 - parseFloat(rangeNode.style.right);

            expect(minEdge).toBe(lowRunnerPosition);
            expect(maxEdge).toBe(highRunnerPosition);
        });

        test('When range mode already is range, should keep view withuot changes', function() {

            options.isRange = true;
            let view = new View(parentElement, options);
            view.changeModeToRange(80, 80);
            let runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;
            let tipsAmount = parentElement.getElementsByClassName(CONSTANTS.tipClassName).length;

            expect(runnersAmount).toBe(2);
            expect(tipsAmount).toBe(2);
        });
    });

    describe('Change mode to single value', function() {
        test('Should delete onw runner and tip and set range.', function() {

            options.isRange = true;
            let view = new View(parentElement, options);
            view.changeModeToSingle();
            let runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;
            let tipsAmount = parentElement.getElementsByClassName(CONSTANTS.tipClassName).length;

            expect(runnersAmount).toBe(1);
            expect(tipsAmount).toBe(1);

            let lowRunnerPosition = view.getRunnerPosition(0);
            let rangeNode = view.getDOMNode().getElementsByClassName(CONSTANTS.rangeClassName)[0] as HTMLElement;
            let minEdge = parseFloat(rangeNode.style.left);
            let maxEdge = 100 - parseFloat(rangeNode.style.right);

            expect(minEdge).toBe(0);
            expect(maxEdge).toBe(lowRunnerPosition);
        });


        test('When range mode is already single, should keep view without changes', function() {

            options.isRange = false;
            let view = new View(parentElement, options);
            view.changeModeToSingle();
            let runnersAmount = parentElement.getElementsByClassName(CONSTANTS.runnerClassName).length;
            let tipsAmount = parentElement.getElementsByClassName(CONSTANTS.tipClassName).length;

            expect(runnersAmount).toBe(1);
            expect(tipsAmount).toBe(1);
        });
    });

    describe('Set tip position', function() {
        test('If tip with input index does not exist, should throw error', function() {
            let view = new View(parentElement, options);
            view.setTipPosition(0, 67);

            expect(() => {
                view.setTipPosition(3, 108);
            }).toThrowError();
        });
    });

    describe('Set runner tip test', function() {
        test('Should set tip dom element text to input text', function() {
            let view = new View(parentElement, options);
            view.setTipText(0, 'test text');
            let tipDOMElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[0] as HTMLElement;

            expect(tipDOMElement.innerText).toBe('test text');
        });
    });

    describe('Hide tips', function() {
        test('Should hide tips by adding css-class to tips dom element', function() {
            options.isTipsHidden = false;
            let view = new View(parentElement, options);
            view.hideTips();
            let tipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[0];

            expect(tipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(true);
        });
    });

    describe('Hide tips', function() {
        test('Should hide tip with input index by adding css-class to tips dom element', function() {
            options.isTipsHidden = false;
            let view = new View(parentElement, options);
            view.hideTip(0);
            let hiddenTipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[0];
            let showedTipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[1];

            expect(hiddenTipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(true);
            expect(showedTipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(false);
        });
    });

    describe('Show tips', function() {
        test('Should show tips by removing css-class from tips classList', function() {
            options.isTipsHidden = true;
            let view = new View(parentElement, options);
            view.showTips();
            let tipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[0];

            expect(tipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(false);
        });
    });

    describe('Show tip', function() {
        test('Should show tip with input index by removing css-class from tips classList', function() {
            options.isTipsHidden = true;
            let view = new View(parentElement, options);
            view.showTip(0);
            let showedTipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[0];
            let hiddenTipElement = parentElement.getElementsByClassName(CONSTANTS.tipClassName)[1];

            expect(showedTipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(false);
            expect(hiddenTipElement.classList.contains(CONSTANTS.tipHiddenClassName)).toBe(true);
        });
    });

    describe('Get orientation', function() {
        test('Should return current orientation', function() {
            options.orientation = Orientation.VERTICAL;
            let view = new View(parentElement, options);
            let output = view.getOrientation();

            expect(output).toEqual(Orientation.VERTICAL);
        });
    });

    describe('Get divisions amount', function() {
        test('Should return correct divisions amount', function() {
            options.divisionsAmount = 4;
            let view = new View(parentElement, options);
            let output = view.getDivisionsAmount();

            expect(output).toBe(4);
        });

    });

    describe('Set orientation', function() {
        test('Should set orientation to input orientation and change classList to needed for this orientaion css-classes',
            function() {
                options.orientation = Orientation.HORIZONTAL;
                let view = new View(parentElement, options);
                view.setOrientation(Orientation.VERTICAL);
                let orientationStyleClass = CONSTANTS.orientationClassNames.get(Orientation.VERTICAL);

                expect(view.getOrientation()).toEqual(Orientation.VERTICAL);
                expect(view.getDOMNode().classList.contains(orientationStyleClass)).toBe(true);
            });
    });

    describe('Set scale divisions amount', function() {
        test('Should set scale divisions amount to input value and recreate scale with input amount of divisions',
            function() {
                let view = new View(parentElement, options);
                view.setScaleDivisionsAmount(5);
                let divisionsAmount = parentElement
                    .getElementsByClassName(CONSTANTS.scaleSubElementClassName).length;

                expect(divisionsAmount).toBe(5);
            });
    });

    describe('Set scale', function() {
        test('Recreate scale with input min and max values', function() {
            let view = new View(parentElement, options);
            view.setScaleEdges(60, 400);
            let firstScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
                .firstChild as HTMLElement;
            let lastScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
                .lastChild as HTMLElement;
            let minValue = parseFloat(firstScaleDivision.innerText);
            let maxValue = parseFloat(lastScaleDivision.innerText);

            expect(minValue).toBe(60);
            expect(maxValue).toBe(400);
        });
    });

    describe('Recreate scale', function() {
        test('Should recreate scale with current values', function() {
            options.divisionsAmount = 3;
            options.minValue = 30;
            options.maxValue = 900;
            let view = new View(parentElement, options);
            view.reCreateScale();
            let divisionsAmount = parentElement
                .getElementsByClassName(CONSTANTS.scaleSubElementClassName).length;

            let firstScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
                .firstChild as HTMLElement;

            let lastScaleDivision = parentElement.getElementsByClassName(CONSTANTS.scaleClassName)[0]
                .lastChild as HTMLElement;
            let minValue = parseFloat(firstScaleDivision.innerText);
            let maxValue = parseFloat(lastScaleDivision.innerText);

            expect(minValue).toBe(30);
            expect(divisionsAmount).toBe(3);
            expect(maxValue).toBe(900);
        });
    });

    describe('Publishers methods', function() {

        test('Attach and detach methods. Should add to observer list input observer ' +
            'and after that remove it from list', function() {

            let view = new View(parentElement, options);
            let observer = new Observer();
            view.attach(observer);
            let expectedSetOfObservers = new Set();
            expectedSetOfObservers.add(observer);
            let expectedObject = { observers: expectedSetOfObservers };

            expect(view).toMatchObject(expectedObject);

            view.detach(observer);
            expectedObject = { observers: new Set() };

            expect(view).toMatchObject(expectedObject);
        });


        test('Should call update method of all in observers list. And after detach, should delete observer' +
            'from list', function() {
            let observer = new Observer();
            let view = new View(parentElement, options);
            view.attach(observer);
            view.notify('smth');

            expect(mockUpdate.mock.calls.length).toBe(1);

            view.notify('smth', { data: 'smth' });

            expect(mockUpdate.mock.calls.length).toBe(2);

            mockUpdate.mock.calls.length = 0;
        });
    });


    describe('Event handlers', function() {
        test('When slider-drag happens should notify all observers and get data of event',
            function() {
                let observer = new Observer();
                let view = new View(parentElement, options);
                view.attach(observer);
                let runnerDOMElement = parentElement.getElementsByClassName(CONSTANTS.runnerClassName)[0];
                let runnerChangeEvent = new CustomEvent('slider-drag',
                    { bubbles: true, cancelable: true, detail: { position: 40, target: runnerDOMElement } });
                runnerDOMElement.dispatchEvent(runnerChangeEvent);

                expect(mockUpdate.mock.calls[0][1]).toEqual({ runnerIndex: 0, position: 40 });
                expect(mockUpdate.mock.calls.length).toBe(1);

                mockUpdate.mock.calls.length = 0;
            });


        test('When slider-click happens, should notify all observers', function() {

            let observer = new Observer();
            let view = new View(parentElement, options);
            view.attach(observer);
            let runnerDOMElement = parentElement.getElementsByClassName(CONSTANTS.runnerClassName)[0];
            let runnerChangeEvent = new CustomEvent('slider-click',
                { bubbles: true, cancelable: true, detail: { position: 40 } });
            runnerDOMElement.dispatchEvent(runnerChangeEvent);

            expect(mockUpdate.mock.calls[0][1]).toEqual({ position: 40 });
            expect(mockUpdate.mock.calls.length).toBe(1);

            mockUpdate.mock.calls.length = 0;
        });
    });
});