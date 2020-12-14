import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';
declare class Runner extends ViewComponent {
    private position;
    private orientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: OrientationBehavior);
    getPosition(): number;
    setPosition(value: number): void;
    setCurrentStatus(newStatus: boolean): void;
    private addMouseEventsHandlers;
    private handleDragStart;
    private handleMouseMove;
    private handleMouseUp;
    private handleMouseDown;
    private addTouchEventsHandler;
    private handleTouchMove;
    private handleTouchEnd;
    private handleTouchStart;
}
export default Runner;
