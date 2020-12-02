import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';
import Orientation from '../../Utils/Orientation';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';

class Runner extends ViewComponent {
  private position: number;

  constructor(parentNode: HTMLElement,
    startPosition: number = 0) {
    super(parentNode, CONSTANTS.runnerClassName);
    this.setPosition(startPosition);
    this.addMouseEventsHandlers();
    this.addTouchEventsHandler();
  }

  public getPosition(): number {
    return this.position;
  }

  public setPosition(value: number): void {
    this.position = value;
    OrientationBehavior.setPosition(value, this.DOMNode);
  }

  public setCurrentStatus(newStatus: boolean): void {
    if (newStatus) {
      this.getDOMNode().classList.add(CONSTANTS.runnerCurrentModifier);
    } else {
      this.getDOMNode().classList.remove(CONSTANTS.runnerCurrentModifier);
    }
  }

  private addMouseEventsHandlers(): void {
    const that: Runner = this;

    function handleDragStart(): boolean {
      return false;
    }

    // Получает позицию положения мыши относительно род. элемента бегунка и вызывает на себе
    // пользовательское событие 'slider-drag', которое содержит объект бегунка
    // и вычисленную позицию
    function handleMouseMove(event: MouseEvent): void {
      try {
        const newPosition = OrientationBehavior
          .getPositionFromCoordinates(event.clientX, event.clientY, that.DOMNode);
        const changePositionEvent: CustomEvent = new CustomEvent('slider-drag',
          { bubbles: true, cancelable: true, detail: { position: newPosition, target: that } });
        that.DOMNode.dispatchEvent(changePositionEvent);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        handleMouseUp();
      }
    }

    // удаляет обработчики событий движения и отклика мыши
    function handleMouseUp(): void {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    // Навешивает на бегунок обработчики событий движения и отклика мыши
    function handleMouseDown(event: MouseEvent): void {
      event.preventDefault();
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    this.DOMNode.addEventListener('mousedown', handleMouseDown);

    this.DOMNode.addEventListener('dragstart', handleDragStart);
  }

  // Навешивает обработчики событий касания на дом-элемент бегунка
  // для Drag'n'Drop на сенсоных устройствах
  private addTouchEventsHandler(): void {
    const that: Runner = this;

    // Получает позицию положения касания относительно род. элемента бегунка и вызывает на себе
    // пользовательское событие 'slider-drag', которое содержит объект бегунка
    // и вычисленную позицию
    function handleTouchMove(event: TouchEvent): void {
      try {
        const touch: Touch = event.targetTouches[0];
        const newPosition = OrientationBehavior.getPositionFromCoordinates(touch.clientX,
          touch.clientY, that.DOMNode);
        const changePositionEvent: CustomEvent = new CustomEvent('slider-drag',
          { bubbles: true, cancelable: true, detail: { position: newPosition, target: that } });
        that.DOMNode.dispatchEvent(changePositionEvent);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        handleTouchEnd(event);
      }
    }

    // Удаляет обработчики событий движения и окончания касания
    function handleTouchEnd(event: TouchEvent): void {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    }

    // Навешивает на бегунок обработчики событий движения и окончания касания
    function handleTouchStart(event: TouchEvent): void {
      event.preventDefault();
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchcancel', handleTouchEnd);
    }

    function handleDragStart(): boolean {
      return false;
    }

    this.DOMNode.addEventListener('touchstart', handleTouchStart);

    this.DOMNode.addEventListener('dragstart', handleDragStart);
  }
}

export default Runner;
