import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';
declare class Tip extends ViewComponent {
    protected isHidden: boolean;
    protected orientationBehavior: IOrientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior, isHidden?: boolean);
    protected init(orientationBehavior: IOrientationBehavior, isHidden: boolean): void;
    setPosition(newPosition: number): void;
    setInnerText(text: string): void;
    getHideStatus(): boolean;
    getOrientationBehavior(): IOrientationBehavior;
    setOrientationBehavior(value: IOrientationBehavior): void;
    hide(): void;
    show(): void;
}
export default Tip;
