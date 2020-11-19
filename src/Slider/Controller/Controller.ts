import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import IObserver from '../Observer/IObserver';

class Controller implements IObserver {
    protected model: Model;

    protected view: View;

    constructor(view: View, model: Model, isRange: boolean) {
      this.init(view, model, isRange);
    }

    protected init(view: View, model: Model, isRange: boolean): void {
      this.view = view;
      this.model = model;
      this.view.attach(this);
      this.model.attach(this);
      this.updateView();
    }

    // Вызывает соответствующий метод в зависимости от события
    public update(eventName: string, data?: any): void {
      if (eventName === 'position-change-by-drag') {
        this.setValues(data.runnerIndex, data.position);
      } else if (eventName === 'position-change-by-click') {
        this.setValues(data.runnerIndex, data.position);
      } else if (eventName === 'edge-value-change') {
        this.updateView();
      } else if (eventName === 'value-change') {
        this.updateView();
      } else if (eventName === 'range-mode-change') {
        this.updateView();
      } else if (eventName === 'resize') {
        this.updateView();
      } else if (eventName === 'step-change') {
        this.updateView();
      } else {
        throw new Error('unknown event');
      }
    }

    public setValues(runnerIndex: number, position: number) {
      if (runnerIndex === 0) {
        this.model.setLowValueByPercent(position);
      } else if (runnerIndex === 1) {
        this.model.setHighValueByPercent(position);
      }
    }

    public updateView(): void{
      let runnerPositions = [this.model.getLowValueInPercent(), this.model.getHighValueInPercent()];
      let tipsValues = [this.model.getLowValue(), this.model.getHighValue()];
      let scalePositions = this.model.splitIntervalByStep(this.view.computeScaleSegmentsAmountBySize());
      let isRange = this.model.getRangeStatus();
      this.view.updateView(runnerPositions, tipsValues, scalePositions, isRange);
    }

}


export default Controller;
