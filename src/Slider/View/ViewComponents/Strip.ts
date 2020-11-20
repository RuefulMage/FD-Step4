import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';

class Strip extends ViewComponent {
  protected orientationBehavior: IOrientationBehavior;

  constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior) {
    super(parentNode, CONSTANTS.stripClassName);
    this.orientationBehavior = orientationBehavior;
    this.addHandlers();
  }

  public setOrientationBehavior(orientationBehavior: IOrientationBehavior): void {
    this.orientationBehavior = orientationBehavior;
  }

  public getOrientationBehavior(): IOrientationBehavior {
    return this.orientationBehavior;
  }

  // Навешивает обработчик клика на дорожку бегунков
  protected addHandlers(): void {
    const that: Strip = this;

    // Если клик был не по бегунку, то вычисляется позиция клика относительно род. элемента
    // и создается пользовательское событие 'slider-click', содержащее вычисленную позицию
    function handleMouseDown(event: MouseEvent): void {
      const runners = that.DOMNode.getElementsByClassName(CONSTANTS.runnerClassName);
      let isTargetRunner = false;

      Object.entries(runners).forEach((key) => {
        if (typeof key === 'number') {
          if (event.target === runners[key]) {
            isTargetRunner = true;
          }
        }
      });

      if (!isTargetRunner) {
        const target = event.target as HTMLElement;
        const position = that.orientationBehavior
          .getPositionFromCoordinates(event.clientX, event.clientY, that.DOMNode);

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
