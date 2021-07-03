import ViewComponent from '../ViewComponent';
import { BasicViewComponentOptions } from '../../types';
declare class Range extends ViewComponent {
    private lowEdge;
    private highEdge;
    private orientationBehavior;
    constructor({ parentNode, orientationBehavior }: BasicViewComponentOptions);
    setLowEdge(value: number): void;
    setHighEdge(value: number): void;
}
export default Range;
