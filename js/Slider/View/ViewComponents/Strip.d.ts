import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';
declare class Strip extends ViewComponent {
    private orientationBehavior;
    constructor(parentNode: HTMLElement, orientationBehavior: OrientationBehavior);
    private addHandlers;
    private handleMouseDown;
}
export default Strip;
