import ViewComponent from './ViewComponent';
import { basicViewComponentOptions } from '../../utils/types';
declare class Tip extends ViewComponent {
    private isHidden;
    private orientationBehavior;
    constructor({ parentNode, orientationBehavior }: basicViewComponentOptions, isHidden?: boolean);
    setPosition(newPosition: number): void;
    setInnerText(text: string): void;
    getHideStatus(): boolean;
    hide(): void;
    show(): void;
}
export default Tip;
