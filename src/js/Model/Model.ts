import IPublisher from '../Observer/IPublisher';
import IObserver from '../Observer/IObserver';
import ModelOptions from '../Utils/ModelOptions';

export default class Model implements IPublisher {
    protected isRange: boolean;

    protected maxValue: number;

    protected minValue: number;

    protected lowValue: number;

    protected highValue: number;

    protected step: number;

    protected observers: Set<IObserver> = new Set<IObserver>();

    constructor(options: ModelOptions) {
      if (options.maxValue <= options.minValue || options.step <= 0) {
        throw new Error('options is not valid');
      }
      this.isRange = options.isRange;
      this.maxValue = options.maxValue;
      this.maxValue = options.maxValue;
      this.minValue = options.minValue;
      this.step = options.step;
      this.lowValue = this.minValue;
      this.highValue = this.maxValue;
      this.setLowValue(options.startValueLow);
      this.setHighValue(options.startValueHigh);
    }

    getRangeStatus(): boolean {
      return this.isRange;
    }

    setRangeMode(isRange: boolean): void{
      this.isRange = isRange;
      this.notify('range-mode-change', { isRange });
      if (isRange) {
        this.setLowValue(this.lowValue);
      }
    }

    getMaxValue(): number {
      return this.maxValue;
    }

    setMaxValue(value: number) {
      if (value <= this.minValue || (value - this.minValue) < this.step) {
        throw new Error('value is not valid');
      } else {
        this.maxValue = value;
        if (this.highValue > value) {
          this.highValue = value;
        } else {
          this.setHighValue(this.highValue);
        }
        this.setLowValue(this.lowValue);
        this.notify('edge-value-change');
      }
    }

    getMinValue(): number {
      return this.minValue;
    }

    setMinValue(value: number) {
      if (value >= this.maxValue || (this.maxValue - value) < this.step) {
        throw new Error('value is not valid');
      } else {
        this.minValue = value;
        if (this.lowValue < value) {
          this.lowValue = value;
        } else {
          this.setLowValue(this.lowValue);
        }
        this.setHighValue(this.highValue);
        this.notify('edge-value-change');
      }
    }

    getLowValue(): number {
      return this.lowValue;
    }

    getLowValueInPercents(): number {
      const value = this.convertValueToPercent(this.lowValue);
      return value;
    }

    setLowValue(value: number): void {
      let newValue = this.validateValue(value);
      if (newValue >= (this.highValue - this.step) && this.isRange) {
        newValue = this.highValue - this.step;
      }
      this.lowValue = newValue;
      this.notify('value-change');
    }

    setLowValueByPercents(percent: number): void {
      const validatedPercent = this.validateValueInPercent(percent);
      const value = this.convertPercentToValue(validatedPercent);
      this.setLowValue(value);
    }

    getHighValue(): number {
      return this.highValue;
    }

    getHighValueInPercents(): number {
      const value = this.convertValueToPercent(this.highValue);
      return value;
    }

    setHighValueByPercents(percent: number): void {
      const validatedPercent = this.validateValueInPercent(percent);
      const value = this.convertPercentToValue(validatedPercent);
      this.setHighValue(value);
    }

    setHighValue(value: number): void {
      let newValue = this.validateValue(value);
      if (newValue <= (this.lowValue + this.step)) {
        newValue = this.lowValue + this.step;
      }
      this.highValue = newValue;
      this.notify('value-change');
    }

    getStep(): number {
      return this.step;
    }

    setStep(value: number): void{
      if ((value > (this.maxValue - this.minValue)) || (value <= 0)) {
        throw new Error('Step value is not valid');
      } else {
        this.step = value;
        this.setLowValue(this.lowValue);
        this.setHighValue(this.highValue);
      }
    }

    protected validateValue(value: number): number {
      let validatedValue;
      if (value <= this.minValue) {
        validatedValue = this.minValue;
      } else if (value >= this.maxValue) {
        validatedValue = this.maxValue;
      } else {
        validatedValue = this.minValue
            + Math.round((value - this.minValue) / this.step) * this.step;
      }
      return validatedValue;
    }

    protected validateValueInPercent(value: number): number {
      let validatedValue;
      if (value >= 100) {
        validatedValue = 100;
      } else if (value <= 0) {
        validatedValue = 0;
      } else {
        const percentsInStep = (100 / (this.maxValue - this.minValue)) * this.step;
        validatedValue = Math.round(value / percentsInStep) * percentsInStep;
      }
      return validatedValue;
    }

    protected convertPercentToValue(percent: number): number {
      let value;
      if (percent >= 100) {
        value = this.maxValue;
      } else if (percent <= 0) {
        value = this.minValue;
      } else {
        value = this.minValue + ((percent / 100) * (this.maxValue - this.minValue));
      }
      return value;
    }

    protected convertValueToPercent(value: number): number {
      const valueInPercent = ((value - this.minValue) / (this.maxValue - this.minValue)) * 100;
      return valueInPercent;
    }

    attach(observer: IObserver): void {
      this.observers.add(observer);
    }

    detach(observer: IObserver): void {
      this.observers.delete(observer);
    }

    notify(eventType: string, data?: any): void {
      if (data !== undefined) {
        this.observers.forEach((value: IObserver) => value.update(eventType, data));
      } else {
        this.observers.forEach((value: IObserver) => value.update(eventType));
      }
    }
}
