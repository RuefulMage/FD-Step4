import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';

class Runner extends ViewComponent {
    protected position: number;
    protected orientationBehavior: IOrientationBehavior;

    constructor(parentNode: HTMLElement,  orientationBehavior: IOrientationBehavior,
                startPosition: number = 0) {
        super(parentNode, CONSTANTS.runnerClassName);
        this.orientationBehavior = orientationBehavior;
        this.setPosition(startPosition);
        this.addMouseEventsHandlers();
        this.addTouchEventsHandler();
    }

    public getPosition(): number {
        return this.position;
    }

    public setPosition(value: number) {
        this.position = value;
        this.orientationBehavior.setPosition(value, this.DOMNode);
    }

    public getOrientationBehavior(): IOrientationBehavior {
        return this.orientationBehavior;
    }

    public setOrientationBehavior(value: IOrientationBehavior) {
        this.orientationBehavior.resetStyles(this.DOMNode);
        this.orientationBehavior = value;
    }



    // Навешивает обработчики событий мыши на дом-элемент бегунка для Drag'n'Drop
    protected addMouseEventsHandlers(): void {
        let that: Runner = this;

        this.DOMNode.addEventListener('mousedown', handleMouseDown);

        this.DOMNode.addEventListener('dragstart', function() {
            return false;
        });

        // Навешивает на бегунок обработчики событий движения и отклика мыши
        function handleMouseDown(event: MouseEvent) {
            event.preventDefault();
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        // Получает позицию положения мыши относительно род. элемента бегунка и вызывает на себе
        // пользовательское событие "slider-drag", которое содержит объект бегунка
        // и вычисленную позицию
        function handleMouseMove(event: MouseEvent): void {
            let newPosition = that.getOrientationBehavior().getPositionFromCoordinates(event.clientX, event.clientY,
                that.DOMNode);
            let changePositionEvent: CustomEvent = new CustomEvent('slider-drag',
                {bubbles: true, cancelable: true, detail: {position: newPosition, target: that}});
            that.DOMNode.dispatchEvent(changePositionEvent);
        }

        // удаляет обработчики событий движения и отклика мыши
        function handleMouseUp(event: MouseEvent): void {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }


    // Навешивает обработчики событий касания на дом-элемент бегунка
    // для Drag'n'Drop на сенсоных устройствах
    protected addTouchEventsHandler(): void {
        let that: Runner = this;

        this.DOMNode.addEventListener('touchstart', handleTouchStart);

        this.DOMNode.addEventListener('dragstart', function() {
            return false;
        });

        // Навешивает на бегунок обработчики событий движения и окончания касания
        function handleTouchStart(event: TouchEvent) {
            event.preventDefault();
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
            document.addEventListener('touchcancel', handleTouchEnd);
        }

        // Получает позицию положения касания относительно род. элемента бегунка и вызывает на себе
        // пользовательское событие "slider-drag", которое содержит объект бегунка
        // и вычисленную позицию
        function handleTouchMove(event: TouchEvent): void {
            let touch: Touch = event.targetTouches[0];
            let newPosition = that.getOrientationBehavior().getPositionFromCoordinates(touch.clientX,
                touch.clientY, that.DOMNode);
            let changePositionEvent: CustomEvent = new CustomEvent('slider-drag',
                {bubbles: true, cancelable: true, detail: {position: newPosition, target: that}});
            that.DOMNode.dispatchEvent(changePositionEvent);
        }

        // Удаляет обработчики событий движения и окончания касания
        function handleTouchEnd(event: TouchEvent): void {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('touchcancel', handleTouchEnd);
        }
    }

}

export default Runner;