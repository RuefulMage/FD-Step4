import { IPublisher } from '../View/IPublisher';
import { IObserver } from '../View/IObserver';
import { options } from '../Utils/types';

export class Model implements IPublisher{
    protected _isRange: boolean;
    protected _maxValue: number;
    protected _minValue: number;
    protected _values: number[] = [this._minValue, this._maxValue];
    protected _step: number;
    protected _observers: Set<IObserver> = new Set<IObserver>();


    constructor(options: options) {
        this._isRange = options.isRange;
        this._maxValue = options.maxValue;
        this._maxValue = options.maxValue;
        this._minValue = options.minValue;
        this._step = options.step;
        this._values = [this._minValue, this._maxValue];
        this.setLowValue(options.startValueLow);
        if(this._isRange){
            this.setHighValue(options.startValueHigh)
        }
    }

    get isRange(): boolean {
        return this._isRange;
    }


    get maxValue(): number {
        return this._maxValue;
    }

    setMaxValue(value: number) {
        if( value <= this.minValue || (value - this.minValue) < this._step ){
            throw new Error('value is not valid');
        } else {
            this._maxValue = value;
            if( this._isRange ){
                this.setHighValue(this.maxValue);
                this.setLowValue(this._values[0]);
            } else if (!this.isRange && this._values[0] > this.maxValue){
                this.setLowValue(this.maxValue);
            }
            this.notify('max-value-change');
        }
    }

    setMinValue(value: number) {
        if( value >= this.maxValue || (this.maxValue - value) < this._step ){
            throw new Error('value is not valid');
        } else {
            this._minValue = value;
            if(this.isRange){
                this.setLowValue(this._values[0]);
                this.setHighValue(this._values[1]);
            } else {
                this.setLowValue(this._values[0]);
            }
            this.notify('min-value-change');
        }
    }

    get minValue(): number {
        return this._minValue;
    }


    setLowValue(value: number): void {
        let newValue = this.validateValue(value);
        if( newValue >= (this._values[1] - this._step) && this._isRange){
            if( this._values[1] >= this.minValue + this._step ){
                newValue = this._values[1] - this._step;
            } else {
                this.setHighValue(this._minValue + this._step);
                this._values[0] = this.minValue;
            }
        } else if (!this._isRange && newValue >= this._maxValue){
            newValue = this._maxValue;
        }
        this._values[0] = newValue;
        this.notify('low-value-change');
    }

    setLowValueByPercents(percent: number): void {
        let validatedPercent = this.validateValueInPercent(percent);
        let value = this.convertPercentToValue(validatedPercent);
        this.setLowValue(value);
    }

    setHighValueByPercents(percent: number): void {
        let validatedPercent = this.validateValueInPercent(percent);
        let value = this.convertPercentToValue(validatedPercent);
        this.setHighValue(value);
    }

    setHighValue(value: number): void {
        let newValue = this.validateValue(value);
        if( newValue <= (this._values[0] + this._step)){
            if(this._values[0] <= this.maxValue - this._step){
                newValue = this._values[0] + this._step;
            } else {
                this.setLowValue(this.maxValue - this._step);
                newValue = this.maxValue;
            }
        }
        this._values[1] = newValue;
        this.notify('high-value-change');
    }


    getLowValue(): number {
        return this._values[0];
    }

    getHighValue(): number {
        return this._values[1];
    }

    getLowValueInPercents(): number {
        let value = this.convertValueToPercent(this._values[0]);
        return value;
    }

    getHighValueInPercents(): number {
        let value = this.convertValueToPercent(this._values[1]);
        return value;
    }


    validateValue(value: number): number {
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

    validateValueInPercent(value: number): number{
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

    convertPercentToValue(percent: number): number{
        let value;
        if( percent >= 100) {
            value = this._maxValue;
        } else if ( percent <= 0 ) {
            value = this.minValue;
        } else {
            value = this._minValue + ((percent / 100) * (this._maxValue - this._minValue));
        }
        return value;
    }

    convertValueToPercent(value: number): number{
        let valueInPercent;
        if( value >= this.maxValue ) {
            valueInPercent = 100;
        } else if ( value <= this.minValue ) {
            valueInPercent = 0;
        } else {
            valueInPercent = ((value - this._minValue) / (this._maxValue - this._minValue)) * 100;
        }
        return valueInPercent;
    }

    setRangeMode(isRange: boolean): void{
        this._isRange = isRange;
        this.notify('range-mode-change');
        if(isRange){
            this.setHighValue(this._values[1]);
        }
    }

    setStep(value: number): void{
        if((value > (this._maxValue - this._minValue)) || (value <= 0)){
            throw new Error('Step value is not valid');
        } else {
            this._step = value;
            this.setLowValue(this._values[0]);
            if(this.isRange){
                this.setHighValue(this._values[1]);
            }
            this.notify('step-change');
        }
    }




    attach(observer: IObserver): void {
        this._observers.add(observer);
    }

    detach(observer: IObserver): void {
        this._observers.delete(observer);
    }

    notify(eventType: string, data?: any): void {
        if( data !== undefined ){
            this._observers.forEach((value: IObserver) => value.update(eventType, data));
        } else {
            this._observers.forEach((value: IObserver) => value.update(eventType));
        }
    }


    get values(): number[] {
        return this._values;
    }

    get step(): number {
        return this._step;
    }

}