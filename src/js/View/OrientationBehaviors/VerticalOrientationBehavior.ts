import IOrientationBehavior from './IOrientationBehavior';

export default class VerticalOrientationBehavior implements IOrientationBehavior{

    setPosition(newPosition: number, domElement: HTMLElement): number {
        let parentHeight = domElement.parentElement.offsetHeight;
        let domElementHeightInProcents: number = (domElement.offsetHeight / parentHeight) * 100;
        domElement.style.bottom = (newPosition - domElementHeightInProcents/2) + '%';

        return newPosition;
    }

    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number {
        let newValueInPixels: number = clientY - domElement.parentElement.getBoundingClientRect().top;
        let parentHeight = domElement.parentElement.offsetHeight;
        let newValue: number = (newValueInPixels / parentHeight) * 100;

        return (100 - newValue);
    }

    resetStyles(domElement: HTMLElement): void {
        domElement.setAttribute('style', '');
    }

    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void {
        domElement.style.bottom = minEdge + '%';
        domElement.style.top = (100 - maxEdge) + '%';
    }

}