import ViewComponent from '../ViewComponent';
import { BasicViewComponentOptions } from '../../types';
declare class Strip extends ViewComponent {
    private orientationBehavior;
    constructor({ parentNode, orientationBehavior }: BasicViewComponentOptions);
    private addHandlers;
    private handleMouseDown;
}
export default Strip;
