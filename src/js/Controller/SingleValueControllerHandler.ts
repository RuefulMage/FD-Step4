import IControllerHandler from './IControllerHandler';
import View from '../View/ViewComponents/View';
import Model from '../Model/Model';

export default class SingleValueControllerHandler implements IControllerHandler {
    protected view: View;

    protected model: Model;

    constructor(view: View, model: Model) {
      this.view = view;
      this.model = model;
      this.view.changeModeToSingle();
    }

    public edgeValueChangeHandler(): void {
      this.view.setScale(this.model.getMinValue(), this.model.getMaxValue());
    }

    public positionChangeByClickHandler(data: any): void {
      this.model.setLowValueByPercents(data.position);
      const newPosition = this.model.getLowValueInPercents();
      this.view.setRunnerPosition(0, newPosition);
      this.view.setRunnerTipText(0, this.model.getLowValue().toString());
      this.view.setRange(0, this.model.getLowValueInPercents());
    }

    public positionChangeByRunnerHandler(data: any): void {
      if (data.runnerIndex === 0) {
        this.model.setLowValueByPercents(data.position);
        const newPosition = this.model.getLowValueInPercents();
        this.view.setRunnerPosition(data.runnerIndex, newPosition);
        this.view.setRange(0, this.model.getLowValueInPercents());
        this.view.setRunnerTipText(0, this.model.getLowValue().toString());
      } else {
        throw new Error('slider in single value mode');
      }
    }

    public valueChangeHandler(): void {
      this.view.setRunnerPosition(0, this.model.getLowValueInPercents());
      this.view.setRunnerTipText(0, this.model.getLowValue().toString());
      this.view.setRange(0, this.model.getLowValueInPercents());
    }
}
