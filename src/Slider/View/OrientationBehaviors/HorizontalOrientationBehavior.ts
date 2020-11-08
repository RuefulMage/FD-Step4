import IOrientationBehavior from './IOrientationBehavior';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["setPosition",
"getPositionFromCoordinates", "resetStyles", "setRangePositions"] }] */
class HorizontalOrientationBehavior implements IOrientationBehavior {
  // Получает новую позицию относительно родителя и дом-элемент и
  // присваивает свойству left этого элемента новую позицию - половину ширины этого элемента
  public setPosition(newPosition: number, domElement: HTMLElement): void {
    const parentWidth = domElement.parentElement.offsetWidth;
    const domElementWidthInPercent = (domElement.offsetWidth / parentWidth) * 100;
    domElement.style.left = `${newPosition - domElementWidthInPercent / 2}%`;
  }

  // Получает координаты точки относительно окна и дом-элемент
  // и возвращает позиуию точки относительно
  // родителя дом-элемента
  public getPositionFromCoordinates(clientX: number, clientY: number,
    domElement: HTMLElement): number {
    if( clientX > window.innerWidth){
      throw new Error("clientX is too big");
    }
    const positionInPixels = clientX - domElement.parentElement.getBoundingClientRect().left;
    const parentWidth = domElement.parentElement.offsetWidth;
    const position = (positionInPixels / parentWidth) * 100;

    return position;
  }

  // Очищает инлайновые стили полученного элемента
  public resetStyles(domElement: HTMLElement): void {
    domElement.setAttribute('style', '');
  }

  // получает дом-элемент и граничные значения относительно родителя
  // и растягивает элемент до этих значений
  public setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
    domElement.style.left = `${minEdge}%`;
    domElement.style.right = `${100 - maxEdge}%`;
  }
}

export default HorizontalOrientationBehavior;
