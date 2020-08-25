import IOrientationBehavior from './IOrientationBehavior';
declare class VerticalOrientationBehavior implements IOrientationBehavior {
    setPosition(newPosition: number, domElement: HTMLElement): void;
    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number;
    resetStyles(domElement: HTMLElement): void;
    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void;
}
export default VerticalOrientationBehavior;
