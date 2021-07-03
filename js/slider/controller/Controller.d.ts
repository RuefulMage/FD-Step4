import View from '../view/viewComponents/view/View';
import Model from '../model/Model';
import { ViewEventName } from '../view/types';
declare class Controller {
    private view;
    private model;
    constructor(view: View, model: Model);
    handleViewEvents(eventName: ViewEventName, data: any): void;
    handleModelEvents(): void;
    private init;
    private setValues;
    private updateView;
}
export default Controller;
