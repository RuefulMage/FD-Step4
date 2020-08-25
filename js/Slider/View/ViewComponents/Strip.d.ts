import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';
declare class Strip extends ViewComponent {
    protected orientationBehavior: IOrientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior);
    setOrientationBehavior(orientationBehavior: IOrientationBehavior): void;
    getOrientationBehavior(): IOrientationBehavior;
    protected addHandlers(): void;
}
export default Strip;
