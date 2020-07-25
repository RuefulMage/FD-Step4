import { IControllerHandler } from './IControllerHandler';
import { View } from '../View/View';
import { Model } from '../Model/Model';

export class SingleValueControllerHandler implements IControllerHandler{

    protected _view: View;
    protected _model: Model;


    constructor(view: View, model: Model) {
        this._view = view;
        this._model = model;
        this._view.changeModeToSingle();
    }

    setLowRunnerPosition(): void {
        this._view.setRunnerPosition(0, this._model.getLowValueInPercents());
        this._view.setRange(0, this._model.getLowValueInPercents());
        this._view.setRunnerTipText(0, this._model.getLowValue().toString());
    }

    setHighRunnerPosition(): void {
        throw new Error('it is single runner mode');
    }

    reCreateScale(): void {
        this._view.setScale(this._model.minValue, this._model.maxValue);
    }

    positionChangeByClickHandler(data: any): void {
        this._model.setLowValueByPercents(data.position);
        let newPosition = this._model.getLowValueInPercents();
        this._view.setRunnerPosition(0, newPosition);
        this._view.setRange(0, this._model.getLowValueInPercents());
        this._view.setRunnerTipText(0, this._model.getLowValue().toString());
    }

    positionChangeByRunnerHandler(data: any): void {
        if ( data.runnerIndex === 0 ){
            this._model.setLowValueByPercents(data.position);
            let newPosition = this._model.getLowValueInPercents();
            this._view.setRunnerPosition(data.runnerIndex, newPosition);
            this._view.setRange(0, this._model.getLowValueInPercents());
            this._view.setRunnerTipText(0, this._model.getLowValue().toString());
        } else {
            throw new Error('slider in single value mode');
        }
    }

    isRange(): boolean {
        return this._model.isRange;
    }
}