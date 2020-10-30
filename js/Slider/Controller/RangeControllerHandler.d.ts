import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import IControllerHandler from './IControllerHandler';
declare class RangeControllerHandler implements IControllerHandler {
    protected view: View;
    protected model: Model;
    constructor(view: View, model: Model);
    handleValueChange(): void;
    handlePositionChangeByClick(data: any): void;
    handlePositionChangeByDrag(data: any): void;
    handleEdgeValueChange(): void;
    handleResize(data: any): void;
    handleStepChange(): void;
    updateRunnersPosition(): void;
    updateTipsPositionAndText(): void;
    updateScale(divisionsAmount: number): void;
    getScalePositions(scaleDivisionsAmount: number): Map<number, number>;
    protected joinTips(): void;
    protected validateDivisionsAmount(divisionsAmount: number): number;
}
export default RangeControllerHandler;
