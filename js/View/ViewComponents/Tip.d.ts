import ViewComponent from './ViewComponent';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
export default class Tip extends ViewComponent {
    protected isHidden: boolean;
    protected orientationBehavior: IOrientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior, isHidden?: boolean, isBelow?: boolean);
    protected init(orientationBehavior: IOrientationBehavior, isHidden: boolean, isBelow: boolean): void;
    setPosition(newPosition: number): void;
    setInnerText(text: string): void;
    getHideStatus(): boolean;
    getOrientationBehavior(): IOrientationBehavior;
    setOrientationBehavior(value: IOrientationBehavior): void;
    hide(): void;
    show(): void;
}
