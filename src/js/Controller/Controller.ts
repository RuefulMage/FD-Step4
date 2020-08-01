import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import IObserver from '../Observer/IObserver';
import IControllerHandler from './IControllerHandler';
import RangeControllerHandler from './RangeControllerHandler';
import SingleValueControllerHandler from './SingleValueControllerHandler';

export default class Controller implements IObserver {
    protected model: Model;

    protected view: View;

    protected controllerHandler: IControllerHandler;

    constructor(view:View, model:Model, isRange: boolean) {
      this.init(view, model, isRange);
    }

    protected init(view:View, model:Model, isRange: boolean) {
      this.view = view;
      this.model = model;
      this.view.attach(this);
      this.model.attach(this);
      this.setControllerHandler(isRange);
      this.controllerHandler.valueChangeHandler();
    }

    public update(eventName: string, data?: any): void {
      if (eventName === 'position-change-by-runner') {
        this.controllerHandler.positionChangeByRunnerHandler(data);
      } else if (eventName === 'position-change-by-click') {
        this.controllerHandler.positionChangeByClickHandler(data);
      } else if (eventName === 'edge-value-change') {
        this.controllerHandler.edgeValueChangeHandler();
      } else if (eventName === 'value-change') {
        this.controllerHandler.valueChangeHandler();
      } else if (eventName === 'range-mode-change') {
        if (data !== undefined) {
          const { isRange } = data;
          this.setControllerHandler(isRange);
        }
      } else {
        throw new Error('unknown event');
      }
    }

    public setControllerHandler(isRange: boolean): void{
      if (isRange) {
        this.controllerHandler = new RangeControllerHandler(this.view, this.model);
      } else {
        this.controllerHandler = new SingleValueControllerHandler(this.view, this.model);
      }
    }

    public getControllerHandler(): IControllerHandler {
      return this.controllerHandler;
    }
}
