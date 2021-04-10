import Constants from '../../utils/constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../orientationBehaviors/OrientationBehavior';

class Runner extends ViewComponent {
  private position: number;

  private orientationBehavior: OrientationBehavior;

  constructor(parentNode: HTMLElement, orientationBehavior: OrientationBehavior) {
    super(parentNode, `${Constants.runnerClassName} ${Constants.runnerPrefixedClassName}`);
    this.orientationBehavior = orientationBehavior;
    this.setPosition(0);
    this.addMouseEventsHandlers();
    this.addTouchEventsHandler();
  }

  public getPosition(): number {
    return this.position;
  }

  public setPosition(value: number): void {
    this.position = value;
    this.orientationBehavior.setPosition(value, this.DOMNode);
  }

  public setCurrentStatus(newStatus: boolean): void {
    if (newStatus) {
      this.getDOMNode().classList.add(Constants.runnerCurrentModifier);
    } else {
      this.getDOMNode().classList.remove(Constants.runnerCurrentModifier);
    }
  }

  private addMouseEventsHandlers(): void {
    this.DOMNode.addEventListener('mousedown', this.handleMouseDown);
    this.DOMNode.addEventListener('dragstart', this.handleDragStart);
  }

  private handleDragStart = (): boolean => false;

  // Получает позицию положения мыши относительно род. элемента бегунка и вызывает на себе
  // пользовательское событие 'slider-drag', которое содержит объект бегунка
  // и вычисленную позицию
  private handleMouseMove = (event: MouseEvent): void => {
    try {
      const newPosition = this.orientationBehavior
        .getPositionFromCoordinates(event.clientX, event.clientY, this.DOMNode);
      const changePositionEvent: CustomEvent = new CustomEvent('slider-drag',
        {
          bubbles: true,
          cancelable: true,
          detail: { position: newPosition, target: this.getDOMNode() },
        });
      this.DOMNode.dispatchEvent(changePositionEvent);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      this.handleMouseUp();
    }
  };

  private handleMouseUp = (): void => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseDown = (event: MouseEvent): void => {
    event.preventDefault();
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  private addTouchEventsHandler(): void {
    this.DOMNode.addEventListener('touchstart', this.handleTouchStart);
    this.DOMNode.addEventListener('dragstart', this.handleDragStart);
  }

  // Получает позицию положения касания относительно род. элемента бегунка и вызывает на себе
  // пользовательское событие 'slider-drag', которое содержит объект бегунка
  // и вычисленную позицию
  private handleTouchMove = (event: TouchEvent): void => {
    try {
      const touch: Touch = event.targetTouches[0];
      const newPosition = this.orientationBehavior.getPositionFromCoordinates(touch.clientX,
        touch.clientY, this.getDOMNode());

      const changePositionEvent: CustomEvent = new CustomEvent(
        'slider-drag',
        {
          bubbles: true,
          cancelable: true,
          detail: { position: newPosition, target: this.getDOMNode() },
        },
      );

      this.getDOMNode().dispatchEvent(changePositionEvent);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      this.handleTouchEnd(event);
    }
  };

  private handleTouchEnd = (event: TouchEvent): void => {
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchcancel', this.handleTouchEnd);
  };

  private handleTouchStart = (event: TouchEvent): void => {
    event.preventDefault();
    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('touchcancel', this.handleTouchEnd);
  };
}

export default Runner;
