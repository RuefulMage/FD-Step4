import ViewComponent from '../ViewComponent';
import { BasicViewComponentOptions } from '../../types';
declare class Scale extends ViewComponent {
    private subElements;
    private orientationBehavior;
    constructor({ parentNode, orientationBehavior }: BasicViewComponentOptions, valuesAndPositions: Map<number, number>);
    setScale(valuesAndPositions: Map<number, number>): void;
    reCreateScale(): void;
    private addHandler;
    private handleRangeCLick;
}
export default Scale;
