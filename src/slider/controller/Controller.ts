import View from '../view/viewComponents/View';
import Model from '../model/Model';
import { ViewEventName } from '../utils/types';

class Controller {
  private model: Model;

  private view: View;

  constructor(view: View, model: Model) {
    this.init(view, model);
  }

  private init(view: View, model: Model): void {
    this.view = view;
    this.model = model;
    this.view.attach(this.handleViewEvents.bind(this));
    this.model.attach(this.handleModelEvents.bind(this));
    this.updateView();
  }

  public handleViewEvents(eventName: ViewEventName, data: any): void {
    const isPositionChangeEvent = eventName === 'position-change-by-drag'
      || eventName === 'position-change-by-click';

    if (isPositionChangeEvent) {
      this.setValues(data.runnerIndex, data.position);
    } else {
      this.updateView();
    }
  }

  public handleModelEvents(): void {
    this.updateView();
  }

  private setValues(runnerIndex: 0 | 1, position: number): void {
    if (runnerIndex === 0) {
      this.model.setLowValueByPercent(position);
    } else if (runnerIndex === 1) {
      this.model.setHighValueByPercent(position);
    }
  }

  private updateView(): void{
    const runnerPositions = [this.model.getLowValueInPercent(), this.model.getHighValueInPercent()];
    const tipsValues = [this.model.getLowValue(), this.model.getHighValue()];
    const scalePositions = this.model
      .splitIntervalByStep(this.view.computeDivisionsAmountBySize());
    const isRange = this.model.getRangeStatus();
    this.view.updateView(runnerPositions, tipsValues, scalePositions, isRange);
  }
}

export default Controller;
