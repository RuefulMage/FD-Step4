import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';

class Strip extends ViewComponent {

  constructor(parentNode: HTMLElement) {
    super(parentNode, CONSTANTS.stripClassName);
    this.addHandlers();
  }

  // Навешивает обработчик клика на дорожку бегунков
  private addHandlers(): void {
    const that: Strip = this;

    // Если клик был не по бегунку, то вычисляется позиция клика относительно род. элемента
    // и создается пользовательское событие 'slider-click', содержащее вычисленную позицию
    function handleMouseDown(event: MouseEvent): void {
      const runners = that.DOMNode.getElementsByClassName(CONSTANTS.runnerClassName);
      let isTargetRunner = false;

      Object.entries(runners).forEach((key, index) => {
        if (event.target === runners[index]) {
          isTargetRunner = true;
        }
      });

      if (!isTargetRunner) {
        const position = OrientationBehavior
          .getPositionFromCoordinates(event.clientX, event.clientY,
            that.DOMNode);

        const customEvent = new CustomEvent('slider-click',
          {
            bubbles: true,
            cancelable: true,
            detail: {
              position,
            },
          });
        that.DOMNode.dispatchEvent(customEvent);
      }
    }

    this.DOMNode.addEventListener('mousedown', handleMouseDown);
  }
}

export default Strip;
