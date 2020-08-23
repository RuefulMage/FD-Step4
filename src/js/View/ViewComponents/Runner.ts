import ViewComponent from './ViewComponent';
import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';

export default class Runner extends ViewComponent {
    protected position: number = 0;
    protected orientationBehavior: IOrientationBehavior;

    constructor(parentNode: HTMLElement,  orientationBehavior: IOrientationBehavior) {
        super(parentNode, CONSTANTS.runnerClassName);
        this.orientationBehavior = orientationBehavior;
        this.addMouseEventsHandler();
        this.addTouchEventsHandler();
    }


    protected addMouseEventsHandler(): void {
        let that: Runner = this;
        
        this.DOMNode.addEventListener('mousedown', mouseDownHandler);

        this.DOMNode.addEventListener('dragstart', function() {
           return false;
        });

        function mouseDownHandler(event: MouseEvent) {
            event.preventDefault();
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        }

        function mouseMoveHandler(event: MouseEvent): void {
            let newPosition = that.getOrientationBehavior().getPositionFromCoordinates(event.clientX, event.clientY,
                that.DOMNode);
            let changePositionEvent: CustomEvent = new CustomEvent('slider-runner-change',
                {bubbles: true, cancelable: true, detail: {position: newPosition, target: that}});
            that.DOMNode.dispatchEvent(changePositionEvent);
        }

        function mouseUpHandler(event: MouseEvent): void {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }
    }


    protected addTouchEventsHandler(): void {
        let that: Runner = this;

        this.DOMNode.addEventListener('touchstart', mouseDownHandler);

        this.DOMNode.addEventListener('dragstart', function() {
           return false;
        });

        function mouseDownHandler(event: MouseEvent) {
            event.preventDefault();
            document.addEventListener('touchmove', touchMoveHandler);
            document.addEventListener('touchend', touchEndHandler);
            document.addEventListener('touchcancel', touchEndHandler);
        }

        function touchMoveHandler(event: TouchEvent): void {
            let touch: Touch = event.targetTouches[0];
            let newPosition = that.getOrientationBehavior().getPositionFromCoordinates(touch.clientX,
                touch.clientY, that.DOMNode);
            let changePositionEvent: CustomEvent = new CustomEvent('slider-runner-change',
                {bubbles: true, cancelable: true, detail: {position: newPosition, target: that}});
            that.DOMNode.dispatchEvent(changePositionEvent);
        }

        function touchEndHandler(event: MouseEvent): void {
            document.removeEventListener('touchmove', touchMoveHandler);
            document.removeEventListener('touchend', touchEndHandler);
            document.removeEventListener('touchcancel', touchEndHandler);
        }
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

}