import {ViewComponent} from './ViewComponent';
import {constants} from '../Utils/Constants';
import { ScaleSubElement } from './ScaleSubElement';
import { IOrientationBehavior } from './IOrientationBehavior';

export class Scale extends ViewComponent{
    protected _subElements: ScaleSubElement[] = [];
    protected _orientationBehavior: IOrientationBehavior;
    protected _divisionsAmount: number;

    constructor(parentNode: JQuery<HTMLElement>, orientationBehavior: IOrientationBehavior, divisionsAmount: number,
                minValue: number = 0, maxValue: number = 100) {
        super(parentNode, constants.scaleClassName);
        this._divisionsAmount = divisionsAmount;
        this._orientationBehavior = orientationBehavior;
        this.setScale(minValue, maxValue);
        this.addHadler();
    }

    public setScale(minValue: number, maxValue: number): void {
        if( minValue >= maxValue){
            throw new Error('Invalid scale parameters');
        }
        this.DOMNode.empty();
        this._subElements = [];
        let currentElementContent = minValue;
        let step = (maxValue - minValue) / (this._divisionsAmount - 1);
        for(let i = 0; i < this._divisionsAmount; i++){
            let elementPosition;
            if( i === 0){
                elementPosition = 0;
            } else if (i === this._divisionsAmount - 1){
                elementPosition = 100;
                currentElementContent = maxValue;
            } else {
                elementPosition = this._subElements[i - 1].position + 100/(this._divisionsAmount - 1);
            }
            this._subElements.push(new ScaleSubElement(this.DOMNode, elementPosition));
            this._subElements[i].DOMNode.text(currentElementContent.toString());
            currentElementContent = Number((currentElementContent + step).toFixed(2));
            this._orientationBehavior.setPosition(elementPosition, this._subElements[i].DOMNode);
        }
    }

    reCreateScale(){
        let minValue: number = Number(this._subElements[0].DOMNode.text());
        let maxValue: number = Number(this._subElements[this._subElements.length - 1].DOMNode.text());
        this.setScale(minValue, maxValue);
    }

    protected addHadler(): void {
        let that: Scale = this;
        this.DOMNode.on('click', function(event) {
                if (event.target !== event.currentTarget) {
                    let customEvent = new CustomEvent('slider-scale-click',
                        {
                            bubbles: true, cancelable: true,
                            detail: {
                                position: event.target.getAttribute('data-scale-position')
                            }
                        });
                    that.DOMNode.get()[0].dispatchEvent(customEvent);
                }
            }
        );
    }


    get orientationBehavior(): IOrientationBehavior {
        return this._orientationBehavior;
    }

    set orientationBehavior(value: IOrientationBehavior) {
        this._orientationBehavior = value;
        this.reCreateScale();
    }


    get divisionsAmount(): number {
        return this._divisionsAmount;
    }

    set divisionsAmount(value: number) {
        this._divisionsAmount = value;
        this.reCreateScale();
    }
}