import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';
import ScaleSubElement from './ScaleSubElement';
declare class Scale extends ViewComponent {
    protected subElements: ScaleSubElement[];
    protected orientationBehavior: IOrientationBehavior;
    protected divisionsAmount: number;
    constructor(parentNode: HTMLElement, options: {
        orientationBehavior: IOrientationBehavior;
        divisionsAmount?: number;
        minValue?: number;
        maxValue?: number;
    });
    setScaleEdges(minValue: number, maxValue: number): void;
    getOrientationBehavior(): IOrientationBehavior;
    setOrientationBehavior(value: IOrientationBehavior): void;
    getDivisionsAmount(): number;
    setDivisionsAmount(value: number): void;
    reCreateScale(): void;
    protected addHandler(): void;
}
export default Scale;
