import { Orientation } from '../../utils/types';
declare class OrientationBehavior {
    private orientation;
    constructor(orientation: Orientation);
    setOrientation(orientation: Orientation): void;
    setPosition(newPosition: number, domElement: HTMLElement): void;
    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number;
    resetStyles(domElement: HTMLElement): void;
    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void;
}
export default OrientationBehavior;
