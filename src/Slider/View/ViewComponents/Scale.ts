import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';
import ScaleSubElement from './ScaleSubElement';

class Scale extends ViewComponent {
    protected subElements: ScaleSubElement[] = [];
    protected orientationBehavior: IOrientationBehavior;

    constructor(parentNode: HTMLElement, options: {
        orientationBehavior: IOrientationBehavior,
        valuesAndPositions: Map<number, number>
    }) {
        super(parentNode, CONSTANTS.scaleClassName);
        let { orientationBehavior, valuesAndPositions } = options;
        this.init(orientationBehavior, valuesAndPositions);
    }

    public init(orientationBehavior: IOrientationBehavior,
                valuesAndPositions: Map<number, number>){
        this.orientationBehavior = orientationBehavior;
        this.setScale(valuesAndPositions);
        this.addHandler();
    }

    public setScale(valuesAndPositions: Map<number, number>): void {
        this.getDOMNode().innerHTML = '';
        this.subElements = [];
        valuesAndPositions.forEach((position,value) => {
            let isSubElementTooCloseToEdge = !((100 - position) > 5 || (position === 100));
            if( !isSubElementTooCloseToEdge ){
                let subElement = new ScaleSubElement(this.getDOMNode(), position);
                subElement.getDOMNode().innerText = value.toString();
                this.subElements.push(subElement);
                this.orientationBehavior.setPosition(position, subElement.getDOMNode());
            }
        });
    }

    public getOrientationBehavior(): IOrientationBehavior {
        return this.orientationBehavior;
    }

    public setOrientationBehavior(value: IOrientationBehavior): void {
        this.orientationBehavior = value;
        this.reCreateScale();
    }

    // Пересоздает шкалу со старыми значениями
    public reCreateScale(): void {
        this.subElements.forEach((element, index) => {
            let position = element.getPosition();
            let value = element.getDOMNode().innerText;
            let subElement = new ScaleSubElement(this.getDOMNode(), position);
            subElement.getDOMNode().innerText = value;
            this.orientationBehavior.setPosition(position, subElement.getDOMNode());
            this.subElements[index].destroy();
            this.subElements[index] = subElement;
        });
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