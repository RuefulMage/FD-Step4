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
    updateRunnersPosition(): void;
    updateTipsPositionAndText(): void;
    protected joinTips(): void;
}
export default RangeControllerHandler;
