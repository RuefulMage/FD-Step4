import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';
import ScaleSubElement from './ScaleSubElement';

class Scale extends ViewComponent {
  private subElements: ScaleSubElement[] = [];

  private orientationBehavior: IOrientationBehavior;

  constructor(parentNode: HTMLElement, options: {
    orientationBehavior: IOrientationBehavior,
    valuesAndPositions: Map<number, number>
  }) {
    super(parentNode, CONSTANTS.scaleClassName);
    const { orientationBehavior, valuesAndPositions } = options;
    this.init(orientationBehavior, valuesAndPositions);
  }

  protected init(orientationBehavior: IOrientationBehavior,
    valuesAndPositions: Map<number, number>) {
    this.orientationBehavior = orientationBehavior;
    this.setScale(valuesAndPositions);
    this.addHandler();
  }

  public setScale(valuesAndPositions: Map<number, number>): void {
    this.getDOMNode().innerHTML = '';
    this.subElements = [];
    valuesAndPositions.forEach((position, value) => {
      const isSubElementTooCloseToEdge = !((100 - position) > 5 || (position === 100));
      if (!isSubElementTooCloseToEdge) {
        const subElement = new ScaleSubElement(this.getDOMNode(), position);
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
      const position = element.getPosition();
      const value = element.getDOMNode().innerText;
      const subElement = new ScaleSubElement(this.getDOMNode(), position);
      subElement.getDOMNode().innerText = value;
      this.orientationBehavior.setPosition(position, subElement.getDOMNode());
      this.subElements[index].destroy();
      this.subElements[index] = subElement;
    });
  }

  // Навершивает обработчик события клик на шкалу
  protected addHandler(): void {
    const that: Scale = this;

    // Если элемент, на который кликнули является дочерним, то создается
    // пользовательское событие, содержащее позицию места клика.
    // Позиция берется из пользовательского
    // аттрибута 'data-scale-position'
    function handleRangeCLick(event: MouseEvent) {
      if (event.target !== event.currentTarget) {
        const target = event.target as HTMLElement;
        const customEvent = new CustomEvent('slider-click',
          {
            bubbles: true,
            cancelable: true,
            detail: {
              position: target.getAttribute('data-scale-position'),
            },
          });
        that.DOMNode.dispatchEvent(customEvent);
      }
    }

    this.DOMNode.addEventListener('click', handleRangeCLick);
  }
}

export default Scale;
