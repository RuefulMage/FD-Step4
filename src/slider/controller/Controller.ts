import View from '../view/viewComponents/View';
import Model from '../model/Model';
import { positionOptions, ViewEventName } from '../utils/types';

class Controller {
  constructor(private view: View, private model: Model) {
    this.init();
  }

  private init(): void {
    this.view.attach(this.handleViewEvents.bind(this));
    this.model.attach(this.handleModelEvents.bind(this));
    this.updateView();
  }

  public handleViewEvents(eventName: ViewEventName, data: any): void {
    const isPositionChangeEvent = eventName === 'position-change-by-drag'
      || eventName === 'position-change-by-click';

    if (isPositionChangeEvent) {
      this.setValues({ index: data.runnerIndex, position: data.position });
    } else {
      this.updateView();
    }
  }

  public handleModelEvents(): void {
    this.updateView();
  }

  private setValues({index, position}: positionOptions): void {
    if (index === 0) {
      this.model.setLowValueByPercent(position);
    } else if (index === 1) {
      this.model.setHighValueByPercent(position);
    }
  }

  private updateView(): void{
    const runnersPositions = [this.model.getLowValueInPercent(), this.model.getHighValueInPercent()];
    const tipsValues = [this.model.getLowValue(), this.model.getHighValue()];
    const scalePositions = this.model
      .splitIntervalByStep(this.view.computeDivisionsAmountBySize());
    const isRange = this.model.getRangeStatus();
    this.view.updateView({runnersPositions, tipsValues, scalePositions, isRange});
  }
}

export default Controller;
