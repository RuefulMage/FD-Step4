import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';
declare class Scale extends ViewComponent {
    private subElements;
    private orientationBehavior;
    constructor(parentNode: HTMLElement, valuesAndPositions: Map<number, number>, orientationBehavior: OrientationBehavior);
    setScale(valuesAndPositions: Map<number, number>): void;
    reCreateScale(): void;
    private addHandler;
    private handleRangeCLick;
}
export default Scale;
