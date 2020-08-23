import IControllerHandler from './IControllerHandler';
import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import CONSTANTS from '../Utils/Constants';

export default class RangeControllerHandler implements IControllerHandler {
    protected view: View;

    protected model: Model;

    constructor(view: View, model: Model) {
        this.view = view;
        this.model = model;
        this.view.changeModeToRange(this.model.getHighValueInPercents(), this.model.getHighValue());
    }

    public valueChangeHandler(): void {
        this.setRunnersPosition();
        this.setTipsPositionAndText();
        this.view.setRange(this.model.getLowValueInPercents(), this.model.getHighValueInPercents());
    }

    public positionChangeByClickHandler(data: any): void {
        const lowRunnerDifference = Math.abs(this.model.getLowValueInPercents() - data.position);
        const highRunnerDifference = Math.abs(this.model.getHighValueInPercents() - data.position);

        if (lowRunnerDifference < highRunnerDifference) {
            this.model.setLowValueByPercents(data.position);
        } else {
            this.model.setHighValueByPercents(data.position);
        }

        this.setRunnersPosition();
        this.setTipsPositionAndText();
        this.view.setRange(this.model.getLowValueInPercents(), this.model.getHighValueInPercents());
    }

    public positionChangeByRunnerHandler(data: any): void {
        if (data.runnerIndex === 0) {
            this.model.setLowValueByPercents(data.position);
        } else if (data.runnerIndex === 1) {
            this.model.setHighValueByPercents(data.position);
        }

        this.setRunnersPosition();
        this.setTipsPositionAndText();
        this.view.setRange(this.model.getLowValueInPercents(), this.model.getHighValueInPercents());
    }

    public edgeValueChangeHandler(): void {
        this.view.setScale(this.model.getMinValue(), this.model.getMaxValue());
    }

    public joinTips() {
        this.view.hideTip(1);
        let tipText: string = this.model.getLowValue().toString() + ' - ' + this.model.getHighValue().toString();
        this.view.setTipText(0, tipText);
        let tipPosition: number = this.model.getLowValueInPercents() +
            (this.model.getHighValueInPercents() - this.model.getLowValueInPercents()) / 2;
        this.view.setTipPosition(0, tipPosition);
    }

    protected setRunnersPosition(){
        this.view.setRunnerPosition(0, this.model.getLowValueInPercents());
        this.view.setRunnerPosition(1, this.model.getHighValueInPercents());
    }

    protected setTipsPositionAndText(){
        let isRunnersTooClose = (this.model.getHighValueInPercents()
            - this.model.getLowValueInPercents()) <= CONSTANTS.tipsJoinDistance;

        if(isRunnersTooClose){
            this.joinTips();
        } else {
            if(!this.view.getHideStatus()){
                this.view.showTips();
            }

            this.view.setTipText(0, this.model.getLowValue().toString());
            this.view.setTipPosition(0, this.model.getLowValueInPercents());

            this.view.setTipText(1, this.model.getHighValue().toString());
            this.view.setTipPosition(1, this.model.getHighValueInPercents());
        }
    }
}
