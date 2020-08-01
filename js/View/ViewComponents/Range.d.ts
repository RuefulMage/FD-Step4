import ViewComponent from './ViewComponent';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
export default class Range extends ViewComponent {
    protected minEdge: number;
    protected maxEdge: number;
    protected orientationBehavior: IOrientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior);
    getMinEdge(): number;
    setMinEdge(value: number): void;
    getMaxEdge(): number;
    setMaxEdge(value: number): void;
    getOrientationBehavior(): IOrientationBehavior;
    setOrientationBehavior(value: IOrientationBehavior): void;
}
