import { IPublisher } from '../View/IPublisher';
import { IObserver } from '../View/IObserver';
import { options } from '../View/View';

export class Model implements IPublisher{
    protected _isRange: boolean = true;
    protected _maxValue: number = -100;
    protected _minValue: number = -200;
    protected values: number[] = [this._minValue, this._maxValue];
    protected step: number = 5;
    protected _observers: Set<IObserver> = new Set<IObserver>();


    constructor(options: options) {
        this._isRange = options.isRange;
        this._maxValue = options.maxValue;
        this._maxValue = options.maxValue;
        this._minValue = options.minValue;
        this.values = [options.startValueLow, options.startValueHigh];
        this.step = options.step;
    }

    get isRange(): boolean {
        return this._isRange;
    }


    get maxValue(): number {
        return this._maxValue;
    }

    setMaxValue(value: number) {
        if( value <= this.minValue || (value - this.minValue) < this.step ){
            throw new Error('value is not valid');
        } else {
            this._maxValue = value;
            if( this._isRange ){
                this.setHighValue(this.maxValue);
                this.setLowValue(this.values[0]);
            } else if (!this.isRange && this.values[0] > this.maxValue){
                this.setLowValue(this.maxValue);
            }
            this.notify('max-value-change');
        }
    }

    setMinValue(value: number) {
        if( value >= this.maxValue || (this.maxValue - value) < this.step ){
            throw new Error('value is not valid');
        } else {
            this._minValue = value;
            if(this.isRange){
                this.setLowValue(this.values[0]);
                this.setHighValue(this.values[1]);
            } else {
                this.setLowValue(this.values[0]);
            }
            this.notify('min-value-change');
        }
    }

    get minValue(): number {
        return this._minValue;
    }


    setLowValue(value: number): void {
        let newValue = this.validateValue(value);
        if( newValue >= this.values[1] && this._isRange){
            if( this.values[1] >= this.minValue + this.step ){
                newValue = this.values[1] - this.step;
            } else {
                this.setHighValue(this._minValue + this.step);
                this.values[0] = this.minValue;
            }
        } else if (!this._isRange && newValue >= this._maxValue){
            newValue = this._maxValue;
        }
        this.values[0] = newValue;
        this.notify('low-value-change');
    }

    setLowValueByPercents(percent: number): void {
        let validatedPercent = this.validateValueInPercent(percent);
        let value = this.convertPercentToValue(validatedPercent);
        this.setLowValue(value);
    }

    setHighValueByPercents(percent: number): void {
        if( !this._isRange ){
            throw new Error("high value does not exits");
        }
        let validatedPercent = this.validateValueInPercent(percent);
        let value = this.convertPercentToValue(validatedPercent);
        this.setHighValue(value);
    }

    setHighValue(value: number): void {
        if( !this._isRange ){
            throw new Error("high value does not exits");
        }
        let newValue = this.validateValue(value);
        if( newValue <= this.values[0]){
            if(this.values[0] <= this.maxValue - this.step){
                newValue = this.values[0] + this.step;
            } else {
                this.setLowValue(this.maxValue - this.step);
                newValue = this.maxValue;
            }
        }
        this.values[1] = newValue;
        this.notify('high-value-change');
    }


    getLowValue(): number {
        return this.values[0];
    }

    getHighValue(): number {
        if( !this._isRange ){
            throw new Error("high value does not exits");
        }
        return this.values[1];
    }

    getLowValueInPercents(): number {
        let value = this.convertValueToPercent(this.values[0]);
        return value;
    }

    getHighValueInPercents(): number {
        if( !this._isRange ){
            throw new Error("high value does not exits");
        }
        let value = this.convertValueToPercent(this.values[1]);
        return value;
    }


    validateValue(value: number): number {
        let validatedValue = this._minValue + Math.round((value - this._minValue) / this.step) * this.step;
        if( validatedValue < this._minValue ){
            validatedValue = this.minValue;
        } else if ( validatedValue > this._maxValue ) {
            validatedValue = this._maxValue;
        }

        return validatedValue;
    }

    validateValueInPercent(value: number): number{
        let percentsInStep = (100 / (this._maxValue - this._minValue)) * this.step;
        let validatedValue = Math.round(value / percentsInStep) * percentsInStep;
        return validatedValue;
    }

    convertPercentToValue(percent: number): number{
        let value = this._minValue + ((percent / 100) * (this._maxValue - this._minValue));
        return value;
    }

    convertValueToPercent(value: number): number{
        let valueInPercent = ((value - this._minValue) / (this._maxValue - this._minValue)) * 100;
        return valueInPercent;
    }

    setRangeMode(isRange: boolean): void{
        this._isRange = isRange;
        if(isRange){
            this.setHighValue(this.values[1]);
        }
        this.notify('range-mode-change');
    }

    setStep(value: number): void{
        if((value > (this._maxValue - this._minValue)) || (value <= 0)){
            throw new Error('Step value is not valid');
        } else {
            this.step = value;
            this.setLowValue(this.values[0]);
            if(this.isRange){
                this.setHighValue(this.values[1]);
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

}