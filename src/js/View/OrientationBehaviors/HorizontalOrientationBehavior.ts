import { IOrientationBehavior } from './IOrientationBehavior';

export class HorizontalOrientationBehavior implements IOrientationBehavior{
    setPosition(newPosition: number, domElement: HTMLElement): number {
        let parentWidth: number = domElement.parentElement.offsetWidth;
        let domElementWidthInProcents: number = (domElement.offsetWidth / parentWidth) * 100;
        domElement.style.left = (newPosition - domElementWidthInProcents/2) + '%';

        return newPosition;
    }

    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {

        let newValueInPixels: number = clientX - domElement.parentElement.getBoundingClientRect().left;
        let parentWidth = domElement.parentElement.offsetWidth;
        let newValue: number = (newValueInPixels / parentWidth) * 100;

        return newValue;
    }



    resetStyles(domElement: HTMLElement): void {
        domElement.setAttribute('style', '');
    }

    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
        domElement.style.left = minEdge + '%';
        domElement.style.right = (100 - maxEdge) + '%';
    }
}