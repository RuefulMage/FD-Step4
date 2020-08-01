import ViewComponent from './ViewComponent';
import CONSTANTS from '../../Utils/Constants';
import ScaleSubElement from './ScaleSubElement';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';

export default class Scale extends ViewComponent{
    protected subElements: ScaleSubElement[] = [];
    protected orientationBehavior: IOrientationBehavior;
    protected divisionsAmount: number;

    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior, divisionsAmount: number,
                minValue: number = 0, maxValue: number = 100) {
        super(parentNode, CONSTANTS.scaleClassName);
        this.divisionsAmount = divisionsAmount;
        this.orientationBehavior = orientationBehavior;
        this.setScale(minValue, maxValue);
        this.addHadler();
    }

    public setScale(minValue: number, maxValue: number): void {
        if( minValue >= maxValue){
            throw new Error('Invalid scale parameters');
        }
        this.DOMNode.innerHTML = '';
        this.subElements = [];
        let currentElementText = minValue;
        let step = (maxValue - minValue) / (this.divisionsAmount - 1);
        for(let i = 0; i < this.divisionsAmount; i++){
            let elementPosition;
            if( i === 0){
                elementPosition = 0;
            } else if (i === this.divisionsAmount - 1){
                elementPosition = 100;
                currentElementText = maxValue;
            } else {
                elementPosition = this.subElements[i - 1].getPosition() + 100/(this.divisionsAmount - 1);
            }
            this.subElements.push(new ScaleSubElement(this.DOMNode, elementPosition));
            this.subElements[i].getDOMNode().innerText = currentElementText.toString();
            currentElementText = Number((currentElementText + step).toFixed(2));
            this.orientationBehavior.setPosition(elementPosition, this.subElements[i].getDOMNode());
        }
    }

    public reCreateScale(){
        let minValue: number = Number(this.subElements[0].getDOMNode().innerText);
        let maxValue: number = Number(this.subElements[this.subElements.length - 1].getDOMNode().innerText);
        this.setScale(minValue, maxValue);
    }

    protected addHadler(): void {
        let that: Scale = this;
        this.DOMNode.addEventListener('click', function(event) {
                if (event.target !== event.currentTarget) {
                    let target = event.target as HTMLElement;
                    let customEvent = new CustomEvent('slider-scale-click',
                        {
                            bubbles: true, cancelable: true,
                            detail: {
                                position: target.getAttribute('data-scale-position')
                            }
                        });
                    that.DOMNode.dispatchEvent(customEvent);
                }
            }
        );
    }


    public getOrientationBehavior(): IOrientationBehavior {
        return this.orientationBehavior;
    }

    public setOrientationBehavior(value: IOrientationBehavior) {
        this.orientationBehavior = value;
        this.reCreateScale();
    }


    public getDivisionsAmount(): number {
        return this.divisionsAmount;
    }

    public setDivisionsAmount(value: number) {
        if(value < 2){
            throw new Error("divisionsAmount must be more or equal than 1");
        }
        this.divisionsAmount = value;
        this.reCreateScale();
    }
}