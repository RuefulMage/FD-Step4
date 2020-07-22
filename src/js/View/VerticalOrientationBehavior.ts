import { IOrientationBehavior} from './IOrientationBehavior';

export class VerticalOrientationBehavior implements IOrientationBehavior{

    setPosition(newPosition: number, domElement: JQuery<HTMLElement>): number {
        let domElementHeightInProcents: number = (domElement.get()[0].offsetHeight / domElement.parent().get()[0].offsetHeight) * 100;
        domElement.css('top', (newPosition - domElementHeightInProcents/2) + '%');
        return newPosition;
    }

    getPositionFromCoordinates(clientX: number, clientY: number, domElement: JQuery<HTMLElement>): number {

        let newValueInPixels: number = clientY - domElement.parent().get()[0].getBoundingClientRect().top;
        let newValue: number = (newValueInPixels / domElement.parent().get()[0].offsetHeight) * 100;

        return newValue;
    }

    resetStyles(domElement: JQuery<HTMLElement>): void {
        domElement.attr('style', '');
    }

    setRangePositions(minEdge: number, maxEdge: number, domElement: JQuery<HTMLElement>): void {
        domElement.css('top', minEdge + '%');
        domElement.css('bottom', (100 - maxEdge) + '%');
    }

}