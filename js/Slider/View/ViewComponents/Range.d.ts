import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';
declare class Range extends ViewComponent {
    protected lowEdge: number;
    protected highEdge: number;
    protected orientationBehavior: IOrientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior, lowEdge?: number, highEdge?: number);
    getLowEdge(): number;
    setLowEdge(value: number): void;
    getHighEdge(): number;
    setHighEdge(value: number): void;
    getOrientationBehavior(): IOrientationBehavior;
    setOrientationBehavior(value: IOrientationBehavior): void;
}
export default Range;
