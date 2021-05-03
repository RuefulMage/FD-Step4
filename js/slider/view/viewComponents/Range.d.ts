import ViewComponent from './ViewComponent';
import { basicViewComponentOptions } from '../../utils/types';
declare class Range extends ViewComponent {
    private lowEdge;
    private highEdge;
    private orientationBehavior;
    constructor({ parentNode, orientationBehavior }: basicViewComponentOptions);
    setLowEdge(value: number): void;
    setHighEdge(value: number): void;
}
export default Range;
