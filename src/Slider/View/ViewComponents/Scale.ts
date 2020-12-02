import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';
import ScaleSubElement from './ScaleSubElement';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';

class Scale extends ViewComponent {
  private subElements: ScaleSubElement[] = [];

  constructor(parentNode: HTMLElement, valuesAndPositions: Map<number, number>) {
    super(parentNode, CONSTANTS.scaleClassName);
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
        OrientationBehavior.setPosition(position, subElement.getDOMNode());
      }
    });
  }

  public reCreateScale(): void {
    this.subElements.forEach((element, index) => {
      const position = element.getPosition();
      const value = element.getDOMNode().innerText;
      const subElement = new ScaleSubElement(this.getDOMNode(), position);
      subElement.getDOMNode().innerText = value;
      OrientationBehavior.setPosition(position, subElement.getDOMNode());
      this.subElements[index].destroy();
      this.subElements[index] = subElement;
    });
  }

  private addHandler(): void {
    this.DOMNode.addEventListener('click', this.handleRangeCLick);
  }

  // Если элемент, на который кликнули является дочерним, то создается
  // пользовательское событие, содержащее позицию места клика.
  // Позиция берется из пользовательского
  // аттрибута 'data-scale-position'
  private handleRangeCLick = (event: MouseEvent) => {
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
      this.getDOMNode().dispatchEvent(customEvent);
    }
  };
}

export default Scale;
