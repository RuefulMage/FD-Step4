import ViewComponent from '../ViewComponent';
import { BasicViewComponentOptions } from '../../types';
declare class Tip extends ViewComponent {
    private orientationBehavior;
    constructor({ parentNode, orientationBehavior }: BasicViewComponentOptions);
    setPosition(newPosition: number): void;
    setInnerText(text: string): void;
}
export default Tip;
