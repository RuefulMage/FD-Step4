import { Orientation } from '../../utils/types';

/* eslint class-methods-use-this: ['error', { 'exceptMethods': ['resetStyles'] }] */
class OrientationBehavior {
  constructor(private orientation: Orientation) {}

  public setOrientation(orientation: Orientation) {
    this.orientation = orientation;
  }

  public setPosition(newPosition: number, domElement: HTMLElement): void {
    if (this.orientation === 'horizontal') {
      const parentWidth = domElement.parentElement.offsetWidth;
      const elementWidth = domElement.offsetWidth;
      const domElementWidthInPercent = (elementWidth / parentWidth) * 100;
      // eslint-disable-next-line no-param-reassign
      domElement.style.left = `${newPosition - domElementWidthInPercent / 2}%`;
    } else {
      const parentHeight = domElement.parentElement.offsetHeight;
      const elementsHeight = domElement.offsetHeight;
      const domElementHeightInPercent = (elementsHeight / parentHeight) * 100;
      // eslint-disable-next-line no-param-reassign
      domElement.style.bottom = `${newPosition - domElementHeightInPercent / 2}%`;
    }
  }

  // Получает координаты точки относительно окна и дом-элемент
  // и возвращает позиуию точки относительно
  // родителя дом-элемента
  public resetStyles(domElement: HTMLElement): void {
    domElement.setAttribute('style', '');
  }

  public getPositionFromCoordinates(clientX: number, clientY: number,
    domElement: HTMLElement, offset: number = 0): number {
    if (clientX > window.innerWidth || clientY > window.innerHeight) {
      throw new Error('clientX or clientY is too big');
    }
    if (this.orientation === 'horizontal') {
      const positionInPixels = clientX - offset
        - domElement.parentElement.getBoundingClientRect().left;
      const parentSize = domElement.parentElement.offsetWidth;
      const position = (positionInPixels / parentSize) * 100;
      return position;
    }
    const positionInPixels = clientY - offset
      - domElement.parentElement.getBoundingClientRect().top;
    const parentSize = domElement.parentElement.offsetHeight;
    const position = (positionInPixels / parentSize) * 100;
    return 100 - position;
  }

  public getOffsetFromCoords(clientX: number, clientY: number,
    domElement: HTMLElement): number {
    if (this.orientation === 'horizontal') {
      const elementWidth = domElement.offsetWidth;
      const middleCoord = domElement.getBoundingClientRect().left + (elementWidth / 2);
      const offset = clientX - middleCoord;
      return offset;
    }
    const elementsHeight = domElement.offsetHeight;
    const middleCoord = domElement.getBoundingClientRect().top + (elementsHeight / 2);
    const offset = clientY - middleCoord;
    return offset;
  }

  public setRangePositions(minEdge: number, maxEdge: number,
    domElement: HTMLElement): void {
    if (this.orientation === 'horizontal') {
      // eslint-disable-next-line no-param-reassign
      domElement.style.left = `${minEdge}%`;
      // eslint-disable-next-line no-param-reassign
      domElement.style.right = `${100 - maxEdge}%`;
    } else {
      // eslint-disable-next-line no-param-reassign
      domElement.style.bottom = `${minEdge}%`;
      // eslint-disable-next-line no-param-reassign
      domElement.style.top = `${100 - maxEdge}%`;
    }
  }
}

export default OrientationBehavior;
