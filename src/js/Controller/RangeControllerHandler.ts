import { IControllerHandler } from './IControllerHandler';
import { View } from '../View/ViewComponents/View';
import { Model } from '../Model/Model';

export class RangeControllerHandler implements IControllerHandler{
    protected _view: View;
    protected _model: Model;


    constructor(view: View, model: Model) {
        this._view = view;
        this._model = model;
        this._view.changeModeToRange(this._model.getHighValueInPercents(), this._model.getHighValue());
    }

    isRange(): boolean {
        return this._model.isRange();
    }

    positionChangeByClickHandler(data: any): void {
        let lowRunnerDifference = Math.abs(this._model.getLowValueInPercents() - data.position);
        let highRunnerDifference = Math.abs(this._model.getHighValueInPercents() - data.position);
        if( lowRunnerDifference < highRunnerDifference){
            this._model.setLowValueByPercents(data.position);
            let newPosition = this._model.getLowValueInPercents();
            this._view.setRunnerPosition(0, newPosition);
            this._view.setRunnerTipText(0, this._model.getLowValue().toString());
        } else {
            this._model.setHighValueByPercents(data.position);
            let newPosition = this._model.getHighValueInPercents();
            this._view.setRunnerPosition(1, newPosition);
            this._view.setRunnerTipText(1, this._model.getHighValue().toString());
        }
        this._view.setRange(this._model.getLowValueInPercents(), this._model.getHighValueInPercents());
    }

    positionChangeByRunnerHandler(data: any): void {

        if ( data.runnerIndex === 0 ){
            this._model.setLowValueByPercents(data.position);
            let newPosition = this._model.getLowValueInPercents();
            this._view.setRunnerPosition(data.runnerIndex, newPosition);
            this._view.setRunnerTipText(0, this._model.getLowValue().toString());
        } else if (data.runnerIndex === 1){
            this._model.setHighValueByPercents(data.position);
            let newPosition = this._model.getHighValueInPercents();
            this._view.setRunnerPosition(data.runnerIndex, newPosition);
            this._view.setRunnerTipText(1, this._model.getHighValue().toString());
        }

        this._view.setRange(this._model.getLowValueInPercents(), this._model.getHighValueInPercents());
    }

    reCreateScale(): void {
        this._view.setScale(this._model.getMinValue(), this._model.getMaxValue());
    }

    setHighRunnerPosition(): void {
        this._view.setRunnerPosition(1, this._model.getHighValueInPercents());
        this._view.setRunnerTipText(1, this._model.getHighValue().toString());
        this._view.setRange(this._model.getLowValueInPercents(), this._model.getHighValueInPercents());
    }

    setLowRunnerPosition(): void {
        this._view.setRunnerPosition(0, this._model.getLowValueInPercents());
        this._view.setRunnerTipText(0, this._model.getLowValue().toString());
        this._view.setRange(this._model.getLowValueInPercents(), this._model.getHighValueInPercents());
    }


}