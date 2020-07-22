import { IOrientationBehavior } from './IOrientationBehavior';

export class HorizontalOrientationBehavior implements IOrientationBehavior{
    setPosition(newPosition: number, domElement: JQuery<HTMLElement>): number {
        let domElementWidthInProcents: number = (domElement.get()[0].offsetWidth / domElement.parent().get()[0].offsetWidth) * 100;
        domElement.css('left', (newPosition - domElementWidthInProcents/2) + '%');
        return newPosition;
    }

    getPositionFromCoordinates(clientX: number, clientY: number, domElement: JQuery<HTMLElement>): number {
        let newValueInPixels: number = clientX - domElement.parent().get()[0].getBoundingClientRect().left;
        let newValue: number = (newValueInPixels / domElement.parent().get()[0].offsetWidth) * 100;

        return newValue;
    }



    resetStyles(domElement: JQuery<HTMLElement>): void {
        domElement.attr('style', '');
    }

    setRangePositions(minEdge: number, maxEdge: number, domElement: JQuery<HTMLElement>): void {
        domElement.css('left', minEdge + '%');
        domElement.css('right', (100 - maxEdge) + '%');
    }
}