import { IPublisher } from '../View/IPublisher';
import { IObserver } from '../View/IObserver';
import { modelOptions} from '../Utils/types';

export class Model implements IPublisher{
    protected _isRange: boolean;
    protected _maxValue: number;
    protected _minValue: number;
    protected _lowValue: number;
    protected _highValue: number;
    protected _step: number;
    protected _observers: Set<IObserver> = new Set<IObserver>();


    constructor(options: modelOptions) {
        if( options.maxValue <= options.minValue || options.step <= 0){
            throw new Error('options is not valid');
        }
        this._isRange = options.isRange;
        this._maxValue = options.maxValue;
        this._maxValue = options.maxValue;
        this._minValue = options.minValue;
        this._step = options.step;
        this._lowValue = this._minValue;
        this._highValue = this._maxValue;
        this.setLowValue(options.startValueLow);
        this.setHighValue(options.startValueHigh)
    }

    isRange(): boolean {
        return this._isRange;
    }


    setRangeMode(isRange: boolean): void{
        this._isRange = isRange;
        this.notify('range-mode-change');
        if(isRange){
            this.setLowValue(this._lowValue);
        }
    }


    getMaxValue(): number {
        return this._maxValue;
    }

    setMaxValue(value: number) {
        if( value <= this._minValue || (value - this._minValue) < this._step ){
            throw new Error('value is not valid');
        } else {
            this._maxValue = value;
            if( this._highValue > value){
                this._highValue = value;
            } else {
                this.setHighValue(this._highValue);
            }
            this.setLowValue(this._lowValue);
            this.notify('max-value-change');
        }
    }

    getMinValue(): number {
        return this._minValue;
    }


    setMinValue(value: number) {
        if( value >= this._maxValue || (this._maxValue - value) < this._step ){
            throw new Error('value is not valid');
        } else {
            this._minValue = value;
            if(this._lowValue < value){
                this._lowValue = value;
            } else {
                this.setLowValue(this._lowValue);
            }
            this.setHighValue(this._highValue);
            this.notify('min-value-change');
        }
    }


    getLowValue(): number {
        return this._lowValue;
    }

    getLowValueInPercents(): number {
        let value = this.convertValueToPercent(this._lowValue);
        return value;
    }


    setLowValue(value: number): void {
        let newValue = this.validateValue(value);
        if( newValue >= (this._highValue - this._step) && this._isRange){
            newValue = this._highValue - this._step;
        }
        this._lowValue = newValue;
        this.notify('low-value-change');
    }



    setLowValueByPercents(percent: number): void {
        let validatedPercent = this.validateValueInPercent(percent);
        let value = this.convertPercentToValue(validatedPercent);
        this.setLowValue(value);
    }



    getHighValue(): number {
        return this._highValue;
    }



    getHighValueInPercents(): number {
        let value = this.convertValueToPercent(this._highValue);
        return value;
    }

    setHighValueByPercents(percent: number): void {
        let validatedPercent = this.validateValueInPercent(percent);
        let value = this.convertPercentToValue(validatedPercent);
        this.setHighValue(value);
    }

    setHighValue(value: number): void {
        let newValue = this.validateValue(value);
        if( newValue <= (this._lowValue + this._step) ){
            newValue = this._lowValue + this._step;
        }
        this._highValue = newValue;
        this.notify('high-value-change');
    }


    getStep(): number{
        return this._step;
    }

    setStep(value: number): void{
        if((value > (this._maxValue - this._minValue)) || (value <= 0)){
            throw new Error('Step value is not valid');
        } else {
            this._step = value;
            this.setLowValue(this._lowValue);
            this.setHighValue(this._highValue);
            this.notify('step-change');
        }
    }


    protected validateValue(value: number): number {
        let validatedValue;
        if( value <= this._minValue ){
            validatedValue = this._minValue;
        } else if ( value >= this._maxValue ) {
            validatedValue = this._maxValue;
        } else {
            validatedValue = this._minValue + Math.round((value - this._minValue) / this._step) * this._step;
        }
        return validatedValue;
    }

    protected validateValueInPercent(value: number): number{
        let validatedValue;
        if( value >= 100) {
            validatedValue = 100
        } else if ( value <= 0 ) {
            validatedValue = 0
        } else {
            let percentsInStep = (100 / (this._maxValue - this._minValue)) * this._step;
            validatedValue = Math.round(value / percentsInStep) * percentsInStep;
        }
        return validatedValue;
    }

    protected convertPercentToValue(percent: number): number{
        let value;
        if( percent >= 100) {
            value = this._maxValue;
        } else if ( percent <= 0 ) {
            value = this._minValue;
        } else {
            value = this._minValue + ((percent / 100) * (this._maxValue - this._minValue));
        }
        return value;
    }

    protected convertValueToPercent(value: number): number{
        let valueInPercent = ((value - this._minValue) / (this._maxValue - this._minValue)) * 100;
        return valueInPercent;
    }




    attach(observer: IObserver): void {
        this._observers.add(observer);
    }

    detach(observer: IObserver): void {
        this._observers.delete(observer);
    }

    notify(eventType: string, data?: any): void {
        this._observers.forEach((value: IObserver) => value.update(eventType));
    }

}