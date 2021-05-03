import ViewComponent from './ViewComponent';
import { basicViewComponentOptions } from '../../utils/types';
declare class Strip extends ViewComponent {
    private orientationBehavior;
    constructor({ parentNode, orientationBehavior }: basicViewComponentOptions);
    private addHandlers;
    private handleMouseDown;
}
export default Strip;
