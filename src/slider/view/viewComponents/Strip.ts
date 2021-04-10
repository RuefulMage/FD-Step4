import Constants from '../../utils/constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../orientationBehaviors/OrientationBehavior';

class Strip extends ViewComponent {
  constructor(parentNode: HTMLElement, private orientationBehavior: OrientationBehavior) {
    super(parentNode, Constants.stripClassName);
    this.addHandlers();
  }

  private addHandlers(): void {
    this.DOMNode.addEventListener('mousedown', this.handleMouseDown);
  }

  // Если клик был не по бегунку, то вычисляется позиция клика относительно род. элемента
  // и создается пользовательское событие 'slider-click', содержащее вычисленную позицию
  private handleMouseDown = (event: MouseEvent): void => {
    const runners = this.getDOMNode().getElementsByClassName(Constants.runnerPrefixedClassName);
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
