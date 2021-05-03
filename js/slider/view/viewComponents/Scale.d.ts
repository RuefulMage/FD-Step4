import ViewComponent from './ViewComponent';
import { basicViewComponentOptions } from '../../utils/types';
declare class Scale extends ViewComponent {
    private subElements;
    private orientationBehavior;
    constructor({ parentNode, orientationBehavior }: basicViewComponentOptions, valuesAndPositions: Map<number, number>);
    setScale(valuesAndPositions: Map<number, number>): void;
    reCreateScale(): void;
    private addHandler;
    private handleRangeCLick;
}
export default Scale;
