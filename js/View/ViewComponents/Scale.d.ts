import ViewComponent from './ViewComponent';
import ScaleSubElement from './ScaleSubElement';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
export default class Scale extends ViewComponent {
    protected subElements: ScaleSubElement[];
    protected orientationBehavior: IOrientationBehavior;
    protected divisionsAmount: number;
    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior, divisionsAmount: number, minValue?: number, maxValue?: number);
    setScale(minValue: number, maxValue: number): void;
    reCreateScale(): void;
    protected addHadler(): void;
    getOrientationBehavior(): IOrientationBehavior;
    setOrientationBehavior(value: IOrientationBehavior): void;
    getDivisionsAmount(): number;
    setDivisionsAmount(value: number): void;
}
