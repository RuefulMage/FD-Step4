import View from '../View/ViewComponents/View';
import Model from '../Model/Model';

class Controller{
  protected model: Model;

  protected view: View;

  constructor(view: View, model: Model) {
    this.init(view, model);
  }

  protected init(view: View, model: Model): void {
    this.view = view;
    this.model = model;
    this.view.attach(this.handleViewEvents.bind(this));
    this.model.attach(this.handleModelEvents.bind(this));
    this.updateView();
  }

  public handleViewEvents(eventName: string, data: any) {
    if (eventName === 'position-change-by-drag') {
      this.setValues(data.runnerIndex, data.position);
    } else if (eventName === 'position-change-by-click') {
      this.setValues(data.runnerIndex, data.position);
    } else if (eventName === 'resize') {
      this.updateView();
    } else {
      throw new Error('unknown view event');
    }
  }


  public handleModelEvents(eventName: string, data: any): void {
    if (eventName === 'edge-value-change') {
      this.updateView();
    } else if (eventName === 'value-change') {
      this.updateView();
    } else if (eventName === 'range-mode-change') {
      this.updateView();
    } else if (eventName === 'step-change') {
      this.updateView();
    } else {
      throw new Error('unknown model event');
    }
  }

  // Обновляет значения в модели
  protected setValues(runnerIndex: number, position: number) {
    if (runnerIndex === 0) {
      this.model.setLowValueByPercent(position);
    } else if (runnerIndex === 1) {
      this.model.setHighValueByPercent(position);
    }
  }

  // Берет из Модели данные и передает их Вью для обновления
  protected updateView(): void{
    const runnerPositions = [this.model.getLowValueInPercent(), this.model.getHighValueInPercent()];
    const tipsValues = [this.model.getLowValue(), this.model.getHighValue()];
    const scalePositions = this.model
      .splitIntervalByStep(this.view.computeDivisionsAmountBySize());
    const isRange = this.model.getRangeStatus();
    this.view.updateView(runnerPositions, tipsValues, scalePositions, isRange);
  }
}

export default Controller;