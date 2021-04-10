import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';

class Strip extends ViewComponent {
  private orientationBehavior: OrientationBehavior;

  constructor(parentNode: HTMLElement, orientationBehavior: OrientationBehavior) {
    super(parentNode, CONSTANTS.stripClassName);
    this.orientationBehavior = orientationBehavior;
    this.addHandlers();
  }

  private addHandlers(): void {
    this.DOMNode.addEventListener('mousedown', this.handleMouseDown);
  }

  // Если клик был не по бегунку, то вычисляется позиция клика относительно род. элемента
  // и создается пользовательское событие 'slider-click', содержащее вычисленную позицию
  private handleMouseDown = (event: MouseEvent): void => {
    const runners = this.getDOMNode().getElementsByClassName(CONSTANTS.runnerPrefixedClassName);
    let isTargetRunner = false;

    Object.entries(runners).forEach((key, index) => {
      if (event.target === runners[index]) {
        isTargetRunner = true;
      }
    });

    if (!isTargetRunner) {
      const position = this.orientationBehavior
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
