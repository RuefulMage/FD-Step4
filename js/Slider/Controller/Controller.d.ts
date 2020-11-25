import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import IObserver from '../Observer/IObserver';
declare class Controller implements IObserver {
    protected model: Model;
    protected view: View;
    constructor(view: View, model: Model);
    protected init(view: View, model: Model): void;
    update(eventName: string, data?: any): void;
    protected setValues(runnerIndex: number, position: number): void;
    protected updateView(): void;
}
export default Controller;
