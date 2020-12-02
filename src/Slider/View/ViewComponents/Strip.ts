import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';

class Strip extends ViewComponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, CONSTANTS.stripClassName);
    this.addHandlers();
  }

  private addHandlers(): void {
    this.DOMNode.addEventListener('mousedown', this.handleMouseDown);
  }

  // Если клик был не по бегунку, то вычисляется позиция клика относительно род. элемента
  // и создается пользовательское событие 'slider-click', содержащее вычисленную позицию
  private handleMouseDown = (event: MouseEvent): void => {
    const runners = this.getDOMNode().getElementsByClassName(CONSTANTS.runnerClassName);
    let isTargetRunner = false;

    Object.entries(runners).forEach((key, index) => {
      if (event.target === runners[index]) {
        isTargetRunner = true;
      }
    });

    if (!isTargetRunner) {
      const position = OrientationBehavior
        .getPositionFromCoordinates(event.clientX, event.clientY,
          this.getDOMNode());

      const customEvent = new CustomEvent('slider-click',
        {
          bubbles: true,
          cancelable: true,
          detail: {
            position,
          },
        });
      this.getDOMNode().dispatchEvent(customEvent);
    }
  };
}

export default Strip;
