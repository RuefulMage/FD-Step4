import IControllerHandler from './IControllerHandler';
import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
export default class SingleValueControllerHandler implements IControllerHandler {
    protected view: View;
    protected model: Model;
    constructor(view: View, model: Model);
    edgeValueChangeHandler(): void;
    positionChangeByClickHandler(data: any): void;
    positionChangeByRunnerHandler(data: any): void;
    valueChangeHandler(): void;
}
