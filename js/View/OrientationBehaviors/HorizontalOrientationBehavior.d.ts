import IOrientationBehavior from './IOrientationBehavior';
export default class HorizontalOrientationBehavior implements IOrientationBehavior {
    setPosition(newPosition: number, domElement: HTMLElement): number;
    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number;
    resetStyles(domElement: HTMLElement): void;
    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void;
}
