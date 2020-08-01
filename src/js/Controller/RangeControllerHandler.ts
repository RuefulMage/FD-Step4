import IControllerHandler from './IControllerHandler';
import View from '../View/ViewComponents/View';
import Model from '../Model/Model';

export default class RangeControllerHandler implements IControllerHandler {
    protected view: View;

    protected model: Model;

    constructor(view: View, model: Model) {
      this.view = view;
      this.model = model;
      this.view.changeModeToRange(this.model.getHighValueInPercents(), this.model.getHighValue());
    }

    public valueChangeHandler(): void {
      this.view.setRunnerTipText(0, this.model.getLowValue().toString());
      this.view.setRunnerTipText(1, this.model.getHighValue().toString());
      this.view.setRunnerPosition(0, this.model.getLowValueInPercents());
      this.view.setRunnerPosition(1, this.model.getHighValueInPercents());
      this.view.setRange(this.model.getLowValueInPercents(), this.model.getHighValueInPercents());
    }

    public positionChangeByClickHandler(data: any): void {
      const lowRunnerDifference = Math.abs(this.model.getLowValueInPercents() - data.position);
      const highRunnerDifference = Math.abs(this.model.getHighValueInPercents() - data.position);
      if (lowRunnerDifference < highRunnerDifference) {
        this.model.setLowValueByPercents(data.position);
        const newPosition = this.model.getLowValueInPercents();
        this.view.setRunnerPosition(0, newPosition);
        this.view.setRunnerTipText(0, this.model.getLowValue().toString());
      } else {
        this.model.setHighValueByPercents(data.position);
        const newPosition = this.model.getHighValueInPercents();
        this.view.setRunnerPosition(1, newPosition);
        this.view.setRunnerTipText(1, this.model.getHighValue().toString());
      }
      this.view.setRange(this.model.getLowValueInPercents(), this.model.getHighValueInPercents());
    }

    public positionChangeByRunnerHandler(data: any): void {
      if (data.runnerIndex === 0) {
        this.model.setLowValueByPercents(data.position);
        const newPosition = this.model.getLowValueInPercents();
        this.view.setRunnerPosition(data.runnerIndex, newPosition);
        this.view.setRunnerTipText(0, this.model.getLowValue().toString());
      } else if (data.runnerIndex === 1) {
        this.model.setHighValueByPercents(data.position);
        const newPosition = this.model.getHighValueInPercents();
        this.view.setRunnerPosition(data.runnerIndex, newPosition);
        this.view.setRunnerTipText(1, this.model.getHighValue().toString());
      }

      this.view.setRange(this.model.getLowValueInPercents(), this.model.getHighValueInPercents());
    }

    public edgeValueChangeHandler(): void {
      this.view.setScale(this.model.getMinValue(), this.model.getMaxValue());
    }
}
