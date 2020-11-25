import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';
declare class Runner extends ViewComponent {
    protected position: number;
    protected orientationBehavior: IOrientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior, startPosition?: number);
    getPosition(): number;
    setPosition(value: number): void;
    getOrientationBehavior(): IOrientationBehavior;
    setOrientationBehavior(value: IOrientationBehavior): void;
    setCurrentStatus(newStatus: boolean): void;
    protected addMouseEventsHandlers(): void;
    protected addTouchEventsHandler(): void;
}
export default Runner;
