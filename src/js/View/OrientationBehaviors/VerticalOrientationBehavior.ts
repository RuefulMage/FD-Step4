import IOrientationBehavior from './IOrientationBehavior';

class VerticalOrientationBehavior implements IOrientationBehavior{

    // Получает новую позицию относительно родителя и дом-элемент и
    // присваивает свойству bottom этого элемента новую позицию - половину высоты этого элемента
    setPosition(newPosition: number, domElement: HTMLElement): void {
        let parentHeight = domElement.parentElement.offsetHeight;
        let domElementHeightInPercent = (domElement.offsetHeight / parentHeight) * 100;
        domElement.style.bottom = (newPosition - domElementHeightInPercent/2) + '%';
    }

    // Получает координаты точки относительно окна и дом-элемент и возвращает позиуию точки относительно
    // родителя дом-элемента
    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
        let positionInPixels = clientY - domElement.parentElement.getBoundingClientRect().top;
        let parentHeight = domElement.parentElement.offsetHeight;
        let position = (positionInPixels / parentHeight) * 100;

        return (100 - position);
    }

    // Очищает инлайновые стили полученного элемента
    resetStyles(domElement: HTMLElement): void {
        domElement.setAttribute('style', '');
    }

    // получает дом-элемент и граничные значения относительно родителя
    // и растягивает элемент до этих значений
    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
        domElement.style.bottom = minEdge + '%';
        domElement.style.top = (100 - maxEdge) + '%';
    }
}

export default VerticalOrientationBehavior;