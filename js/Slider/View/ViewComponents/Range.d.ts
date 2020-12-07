import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';
declare class Range extends ViewComponent {
    private lowEdge;
    private highEdge;
    private orientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: OrientationBehavior, lowEdge?: number, highEdge?: number);
    getLowEdge(): number;
    setLowEdge(value: number): void;
    getHighEdge(): number;
    setHighEdge(value: number): void;
}
export default Range;
