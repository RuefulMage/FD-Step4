import { Controller } from './Controller/Controller';
import { Model } from './Model/Model';
import { View} from './View/View';
import { IObserver } from './View/IObserver';
import { options, Orientation } from './Utils/types';

export class Slider implements IObserver{
    protected _view: View;
    protected _model: Model;
    protected _controller: Controller;
    protected _rootElement: JQuery<HTMLElement>;


    constructor(rootElement: JQuery<HTMLElement>, options: options) {
        this._rootElement = rootElement;
        this._model = new Model(options);
        this._model.attach(this);
        this._view = new View(rootElement, options);
        this._view.attach(this);
        this._controller = new Controller(this._view, this._model, options.isRange);
    }


    isRange(): boolean{
        return this._model.isRange();
    }

    getMinValue(): number{
        return this._model.getMinValue();
    }

    getMaxValue(): number{
        return this._model.getMaxValue();
    }

    getHighValue(): number{
        return this._model.getHighValue();
    }

    getLowValue(): number{
        return this._model.getLowValue();
    }

    getStep(): number{
        return this._model.getStep();
    }

    setStep(step: number) {
        this._model.setStep(step);
    }

    setMaxValue(maxValue: number) {
        this._model.setMaxValue(maxValue);
    }
    setMinValue(minValue: number) {
        this._model.setMinValue(minValue);
    }

    setLowValue(lowValue: number) {
        this._model.setLowValue(lowValue);
    }

    setHighValue(highValue: number) {
        this._model.setHighValue(highValue);
    }

    setRangeMode(isRange: boolean){
        console.log("setRangeMode " + isRange);
        this._model.setRangeMode(isRange);
    }

    setOrientation(orientation: string){
        this._view.orientation = orientation as Orientation;
    }

    hideTips(){
        this._view.hideTips();
    }

    showTips(){
        this._view.showTips();
    }

    setDivisionsAmount(divisionsAmount: number){
        this._view.setScaleDivisionsAmount(divisionsAmount);

    }

    update(eventName: string, data?: any): void {
        let changeEvent = new CustomEvent('slider-change', {bubbles: true, cancelable: true});
        this._rootElement.get()[0].dispatchEvent(changeEvent);
    }
}


;(function($) {
    $.fn.slider = function(userOptions: options){
        let options = $.extend(true, $.fn.slider.defaultOptions, userOptions);

        return this.each(function(){
            if(!$(this).data('slider')){
                let slider = new Slider($(this), options);
                $(this).data('slider', slider);
            }
        });
    }

    $.fn.slider.defaultOptions = {
        divisionsAmount: 2,
        isRange: false,
        isTipsHidden: false,
        maxValue: 100,
        minValue: 0,
        orientation: 'horizontal',
        startValueHigh: 100,
        startValueLow: 0,
        step: 1
    }
}(jQuery));