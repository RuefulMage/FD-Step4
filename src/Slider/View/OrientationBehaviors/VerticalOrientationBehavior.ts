import IOrientationBehavior from './IOrientationBehavior';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["setPosition",
"getPositionFromCoordinates", "resetStyles", "setRangePositions"] }] */
class VerticalOrientationBehavior implements IOrientationBehavior {
  // Получает новую позицию относительно родителя и дом-элемент и
  // присваивает свойству bottom этого элемента новую позицию - половину высоты этого элемента
  public setPosition(newPosition: number, domElement: HTMLElement): void {
    const parentHeight = domElement.parentElement.offsetHeight;
    const domElementHeightInPercent = (domElement.offsetHeight / parentHeight) * 100;
    // eslint-disable-next-line no-param-reassign
    domElement.style.bottom = `${newPosition - domElementHeightInPercent / 2}%`;
  }

  // Получает координаты точки относительно окна
  // и дом-элемент и возвращает позиуию точки относительно
  // родителя дом-элемента
  public getPositionFromCoordinates(clientX: number, clientY: number,
    domElement: HTMLElement): number {
    if (clientY > window.innerHeight) {
      throw new Error('clientY is too big');
    }
    const positionInPixels = clientY - domElement.parentElement.getBoundingClientRect().top;
    const parentHeight = domElement.parentElement.offsetHeight;
    const position = (positionInPixels / parentHeight) * 100;

    return (100 - position);
  }

  // Очищает инлайновые стили полученного элемента
  public resetStyles(domElement: HTMLElement): void {
    domElement.setAttribute('style', '');
  }

  // получает дом-элемент и граничные значения относительно родителя
  // и растягивает элемент до этих значений
  public setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
    // eslint-disable-next-line no-param-reassign
    domElement.style.bottom = `${minEdge}%`;
    // eslint-disable-next-line no-param-reassign
    domElement.style.top = `${100 - maxEdge}%`;
  }
}

export default VerticalOrientationBehavior;
