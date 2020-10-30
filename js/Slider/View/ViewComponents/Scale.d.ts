import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';
import ScaleSubElement from './ScaleSubElement';
declare class Scale extends ViewComponent {
    protected subElements: ScaleSubElement[];
    protected orientationBehavior: IOrientationBehavior;
    constructor(parentNode: HTMLElement, options: {
        orientationBehavior: IOrientationBehavior;
        valuesAndPositions: Map<number, number>;
    });
    init(orientationBehavior: IOrientationBehavior, valuesAndPositions: Map<number, number>): void;
    setScale(valuesAndPositions: Map<number, number>): void;
    getOrientationBehavior(): IOrientationBehavior;
    setOrientationBehavior(value: IOrientationBehavior): void;
    reCreateScale(): void;
    protected addHandler(): void;
}
export default Scale;
