import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';
declare class Tip extends ViewComponent {
    private isHidden;
    private orientationBehavior;
    constructor(parentNode: HTMLElement, isHidden: boolean, orientationBehavior: OrientationBehavior);
    setPosition(newPosition: number): void;
    setInnerText(text: string): void;
    getHideStatus(): boolean;
    hide(): void;
    show(): void;
}
export default Tip;
