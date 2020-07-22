// TODO Сделать координаты через JQuery
export interface IOrientationBehavior{

    setPosition(newPosition: number, domElement: JQuery<HTMLElement>): number;

    getPositionFromCoordinates(clientX: number, clientY: number, domElement: JQuery<HTMLElement>): number;

    setRangePositions(minEdge: number, maxEdge: number, domElement: JQuery<HTMLElement>): void;

    resetStyles(runner: JQuery<HTMLElement>): void;
}