import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import ViewEventName from '../Utils/ViewEventName';
declare class Controller {
    private model;
    private view;
    constructor(view: View, model: Model);
    private init;
    handleViewEvents(eventName: ViewEventName, data: any): void;
    handleModelEvents(): void;
    private setValues;
    private updateView;
}
export default Controller;
