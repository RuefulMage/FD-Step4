import IOrientationBehavior from './IOrientationBehavior';

class HorizontalOrientationBehavior implements IOrientationBehavior{

    // Получает новую позицию относительно родителя и дом-элемент и
    // присваивает свойству left этого элемента новую позицию - половину ширины этого элемента
    setPosition(newPosition: number, domElement: HTMLElement): void {

        let parentWidth = domElement.parentElement.offsetWidth;
        let domElementWidthInPercent = (domElement.offsetWidth / parentWidth) * 100;
        domElement.style.left = (newPosition - domElementWidthInPercent/2) + '%';
    }

    // Получает координаты точки относительно окна и дом-элемент и возвращает позиуию точки относительно
    // родителя дом-элемента
    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {

        let positionInPixels = clientX - domElement.parentElement.getBoundingClientRect().left;
        let parentWidth = domElement.parentElement.offsetWidth;
        let position = (positionInPixels / parentWidth) * 100;

        return position;
    }

    // Очищает инлайновые стили полученного элемента
    resetStyles(domElement: HTMLElement): void {
        domElement.setAttribute('style', '');
    }

    // получает дом-элемент и граничные значения относительно родителя
    // и растягивает элемент до этих значений
    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
        domElement.style.left = minEdge + '%';
        domElement.style.right = (100 - maxEdge) + '%';
    }
}

export default HorizontalOrientationBehavior;