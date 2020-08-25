import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import IObserver from '../Observer/IObserver';
import IControllerHandler from './IControllerHandler';
declare class Controller implements IObserver {
    protected model: Model;
    protected view: View;
    protected controllerHandler: IControllerHandler;
    constructor(view: View, model: Model, isRange: boolean);
    protected init(view: View, model: Model, isRange: boolean): void;
    update(eventName: string, data?: any): void;
    setControllerHandler(isRange: boolean): void;
    getControllerHandler(): IControllerHandler;
}
export default Controller;
