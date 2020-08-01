export default interface IOrientationBehavior {
    setPosition(newPosition: number, domElement: HTMLElement): number;
    getPositionFromCoordinates(clientX: number, clientY: number, domElement: HTMLElement): number;
    setRangePositions(minEdge: number, maxEdge: number, domElement: HTMLElement): void;
    resetStyles(runner: HTMLElement): void;
}
