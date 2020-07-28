import { ViewComponent } from './ViewComponent';
import { constants } from '../../Utils/Constants';
import { IOrientationBehavior } from '../OrientationBehaviors/IOrientationBehavior';
import TriggeredEvent = JQuery.TriggeredEvent;

export class Runner extends ViewComponent {
    protected _position: number = 0;
    protected _orientationBehavior: IOrientationBehavior;

    constructor(parentNode: HTMLElement,  orientationBehavior: IOrientationBehavior) {
        super(parentNode, constants.runnerClassName);
        this._orientationBehavior = orientationBehavior;
        this.addHadler();
    }


    protected addHadler(): void {
        let that: Runner = this;
        
        this.DOMNode.addEventListener('mousedown', mouseDownHandler);

        this.DOMNode.addEventListener('dragstart', function() {
           return false;
        });

        function mouseDownHandler(event: Event) {
            event.preventDefault();
            $(document).on('mousemove', mouseMoveHandler);
            $(document).on('mouseup', mouseUpHandler);
        }

        function mouseMoveHandler(event: TriggeredEvent): void {
            if( event.clientX !== undefined && event.clientY !== undefined){
                let newPosition = that.orientationBehavior.getPositionFromCoordinates(event.clientX, event.clientY,
                    that.DOMNode);
                let changePositionEvent: CustomEvent = new CustomEvent('slider-runner-change',
                    {bubbles: true, cancelable: true, detail: {position: newPosition, target: that}});
                that.DOMNode.dispatchEvent(changePositionEvent);
            } else {
                throw new Error('no clientX and clientY');
            }
        }

        function mouseUpHandler(event: TriggeredEvent): void {
            $(document).off('mousemove');
            $(document).off('mouseup');
        }
    }

    get position(): number {
        return this._position;
    }


    set position(value: number) {
        this._position = this._orientationBehavior.setPosition(value, this._DOMNode);
    }

    get orientationBehavior(): IOrientationBehavior {
        return this._orientationBehavior;
    }


    set orientationBehavior(value: IOrientationBehavior) {
        this._orientationBehavior.resetStyles(this.DOMNode);
        this._orientationBehavior = value;
    }

}