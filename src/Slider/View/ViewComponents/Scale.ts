import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';
import ScaleSubElement from './ScaleSubElement';

class Scale extends ViewComponent {
    protected subElements: ScaleSubElement[] = [];
    protected orientationBehavior: IOrientationBehavior;
    protected divisionsAmount: number;

    constructor(parentNode: HTMLElement, options: {
        orientationBehavior: IOrientationBehavior, divisionsAmount?: number,
        minValue?: number, maxValue?: number
    }) {
        super(parentNode, CONSTANTS.scaleClassName);

        let { orientationBehavior, divisionsAmount = 2, minValue = 0, maxValue = 100 } = options;
        this.divisionsAmount = divisionsAmount;
        this.orientationBehavior = orientationBehavior;
        this.setScaleEdges(minValue, maxValue);
        this.addHandler();
    }

    // Пересоздает шкалу с новыми значениями
    public setScaleEdges(minValue: number, maxValue: number): void {
        if (minValue >= maxValue) {
            throw new Error('Invalid scale parameters');
        }

        this.DOMNode.innerHTML = '';
        this.subElements = [];
        let step = (maxValue - minValue) / (this.divisionsAmount - 1);

        // Для каждого index создается элемент ScaleSubElement с вычислелнными значениями и сохраняется в
        // массив subElements и размещает его на шкале
        for (let index = 0; index < this.divisionsAmount; index++) {
            let elementPosition;
            let currentElementText;
            if (index === 0) {
                elementPosition = 0;
                currentElementText = minValue;
            } else if (index === this.divisionsAmount - 1) {
                elementPosition = 100;
                currentElementText = maxValue;
            } else {
                elementPosition = this.subElements[index - 1].getPosition() + 100 / (this.divisionsAmount - 1);
                currentElementText = Number((minValue + (step * index)).toFixed(2));
            }
            let subElement: ScaleSubElement = new ScaleSubElement(this.DOMNode, elementPosition);
            subElement.getDOMNode().innerText = currentElementText.toString();
            this.subElements.push(subElement);
            this.orientationBehavior.setPosition(elementPosition, this.subElements[index].getDOMNode());
        }
    }

    public getOrientationBehavior(): IOrientationBehavior {
        return this.orientationBehavior;
    }

    public setOrientationBehavior(value: IOrientationBehavior): void {
        this.orientationBehavior = value;
        this.reCreateScale();
    }

    public getDivisionsAmount(): number {
        return this.divisionsAmount;
    }


    public setDivisionsAmount(value: number): void {
        let isAmountInValidRange = !((value < 2) || (value > CONSTANTS.scaleSubElementMaxAmount));

        if (!isAmountInValidRange) {
            throw new Error('divisionsAmount must be in range: [1:' + CONSTANTS.scaleSubElementMaxAmount + ']');
        }
        this.divisionsAmount = value;
        this.reCreateScale();
    }

    // Пересоздает шкалу со старыми значениями
    public reCreateScale(): void {
        let minValue: number = Number(this.subElements[0].getDOMNode().innerText);
        let maxValue: number = Number(this.subElements[this.subElements.length - 1].getDOMNode().innerText);
        this.setScaleEdges(minValue, maxValue);
    }

    // Навершивает обработчик события клик на шкалу
    protected addHandler(): void {
        let that: Scale = this;
        this.DOMNode.addEventListener('click', handleRangeCLick);

        // Если элемент, на который кликнули является дочерним, то создается
        // пользовательское событие, содержащее позицию места клика. Позиция берется из пользовательского
        // аттрибута 'data-scale-position'
        function handleRangeCLick(event: MouseEvent) {
            if (event.target !== event.currentTarget) {
                let target = event.target as HTMLElement;
                let customEvent = new CustomEvent('slider-click',
                    {
                        bubbles: true, cancelable: true,
                        detail: {
                            position: target.getAttribute('data-scale-position'),
                        },
                    });
                that.DOMNode.dispatchEvent(customEvent);
            }

        }
    }

}

export default Scale;