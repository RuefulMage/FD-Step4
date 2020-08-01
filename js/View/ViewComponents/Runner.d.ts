import ViewComponent from './ViewComponent';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
export default class Runner extends ViewComponent {
    protected position: number;
    protected orientationBehavior: IOrientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior);
    protected addHadler(): void;
    getPosition(): number;
    setPosition(value: number): void;
    getOrientationBehavior(): IOrientationBehavior;
    setOrientationBehavior(value: IOrientationBehavior): void;
}
