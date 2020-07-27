import { View } from '../View/View';
import { Model } from '../Model/Model';
import { IObserver } from '../View/IObserver';
import { IControllerHandler } from './IControllerHandler';
import { RangeControllerHandler } from './RangeControllerHandler';
import { SingleValueControllerHandler } from './SingleValueControllerHandler';

export class Controller implements IObserver{
    protected _model: Model;
    protected _view: View;
    protected _controllerHandler: IControllerHandler;

    constructor(view:View, model:Model, isRange: boolean) {
        this._view = view;
        this._model = model;
        view.attach(this);
        model.attach(this);
        if( isRange ){
            this._controllerHandler = new RangeControllerHandler(view, model);
            this._controllerHandler.setLowRunnerPosition();
            this._controllerHandler.setHighRunnerPosition();
        } else {
            this._controllerHandler = new SingleValueControllerHandler(view, model);
            this._controllerHandler.setLowRunnerPosition();
        }
    }

    update(eventName: string, data?: any): void {
        if( eventName === 'position-change-by-runner'){
            this._controllerHandler.positionChangeByRunnerHandler(data);
        } else if( eventName === 'position-change-by-click'){
            this._controllerHandler.positionChangeByClickHandler(data);
        }else if(eventName === 'max-value-change' || eventName === 'min-value-change'){
            this._controllerHandler.reCreateScale();
            this._controllerHandler.setLowRunnerPosition();
            if( this._model.isRange()){
                this._controllerHandler.setHighRunnerPosition();
            }
        } else if(eventName === 'low-value-change'){
            this._controllerHandler.setLowRunnerPosition();
        } else if(eventName === 'high-value-change'){
            if( this._model.isRange()){
                this._controllerHandler.setHighRunnerPosition();
            }
        } else if(eventName === 'step-change'){
            this._controllerHandler.setLowRunnerPosition();
            if(this._model.isRange()){
                this._controllerHandler.setHighRunnerPosition();
            }
        } else if(eventName === 'range-mode-change') {
            let isRange = this._controllerHandler.isRange();
            this.setControllerHandler(isRange);
        } else{
            throw new Error("unknown event");
        }
    }

    setControllerHandler(isRange: boolean): void{
        if( isRange ){
            this._controllerHandler = new RangeControllerHandler(this._view, this._model);
        } else {
            this._controllerHandler = new SingleValueControllerHandler(this._view, this._model);
        }
    }

}