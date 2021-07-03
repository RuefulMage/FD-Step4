import ViewComponent from '../ViewComponent';
import { BasicViewComponentOptions } from '../../types';
declare class Runner extends ViewComponent {
    private currentOffset;
    private position;
    private orientationBehavior;
    constructor({ parentNode, orientationBehavior }: BasicViewComponentOptions, currentOffset?: number);
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
