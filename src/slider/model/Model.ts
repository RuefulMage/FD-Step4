import Big from 'big.js';
import Publisher from '../publisher/Publisher';
import { DefaultSliderOptions, modelOptions } from '../utils/types';

class Model extends Publisher {
  private isRange: boolean;
  private maxValue: number;
  private minValue: number;
  private lowValue: number;
  private highValue: number;
  private step: number;

  constructor(options: modelOptions) {
    super();
    this.init(options);
  }

  public getRangeStatus(): boolean {
    return this.isRange;
  }

  public setRangeMode(isRange: boolean): void {
    this.isRange = isRange;
    this.notify('range-mode-change', { isRange });
    if (isRange) {
      this.setHighValue(this.highValue);
      this.setLowValue(this.lowValue);
    }
  }

  public getMaxValue(): number {
    return this.maxValue;
  }

  public setMaxValue(value: number) {
    const isValueValid = !((value <= this.minValue) || ((value - this.minValue) < this.step));
    if (!isValueValid) {
      throw new Error('value is not valid');
    } else {
      this.maxValue = value;
      if (this.highValue > value) {
        this.highValue = value;
      } else {
        this.setHighValue(this.highValue);
      }
      this.setLowValue(this.lowValue);
      this.notify('edge-value-change', {});
    }
  }

  public getMinValue(): number {
    return this.minValue;
  }

  public setMinValue(value: number) {
    const isValueValid = !((value >= this.maxValue) || ((this.maxValue - value) < this.step));
    if (!isValueValid) {
      throw new Error('value is not valid');
    } else {
      this.minValue = value;
      if (this.lowValue < value) {
        this.lowValue = value;
      } else {
        this.setLowValue(this.lowValue);
      }
      this.setHighValue(this.highValue);
      this.notify('edge-value-change', {});
    }
  }

  public getLowValue(): number {
    return this.lowValue;
  }

  public getLowValueInPercent(): number {
    const value = this.convertValueToPercent(this.lowValue);
    return value;
  }

  public setLowValue(value: number): void {
    let newLowValue = this.validateValue(value);
    const isValueTooCloseToHighValue = newLowValue >= (this.highValue - this.step)
      && this.isRange;
    if (isValueTooCloseToHighValue) {
      newLowValue = Number(Big(this.highValue).minus(this.step));
      newLowValue = this.validateValue(newLowValue);
    }
    this.lowValue = newLowValue;
    this.notify('value-change', {});
  }

  public setLowValueByPercent(valueInPercent: number): void {
    const validatedValue = this.validateValueInPercent(valueInPercent);
    const newLowValue = this.convertPercentToValue(validatedValue);
    this.setLowValue(newLowValue);
  }

  public getHighValue(): number {
    return this.highValue;
  }

  public getHighValueInPercent(): number {
    const value = this.convertValueToPercent(this.highValue);
    return value;
  }

  public setHighValueByPercent(valueInPercent: number): void {
    const validatedValue = this.validateValueInPercent(valueInPercent);
    const newHighValue = this.convertPercentToValue(validatedValue);
    this.setHighValue(newHighValue);
  }

  public setHighValue(value: number): void {
    let newValue = this.validateValue(value);
    const isValuesTooClose = newValue <= (this.lowValue + this.step);
    const isHighValueOnMax = newValue === this.maxValue;
    const isHighValueShouldBeBigger = isValuesTooClose && !isHighValueOnMax;
    const isLowValueShouldBeSmaller = isValuesTooClose && isHighValueOnMax;
    if (isHighValueShouldBeBigger && this.isRange) {
      newValue = Number(Big(this.lowValue).plus(this.step));
    } else if (isLowValueShouldBeSmaller && this.isRange) {
      this.setLowValue(Number(Big(this.highValue).minus(this.step)));
    }
    this.highValue = newValue;
    this.notify('value-change', {});
  }

  public getStep(): number {
    return this.step;
  }

  public setStep(value: number): void {
    const isValueValid = !((value > (this.maxValue - this.minValue)) || (value <= 0));
    if (!isValueValid) {
      throw new Error('Step value is not valid');
    } else {
      this.step = value;
      this.setLowValue(this.lowValue);
      this.setHighValue(this.highValue);
      this.notify('step-change', {});
    }
  }

  // Делит интервал на равные отрезки согласно шагу
  public splitIntervalByStep(divisionsAmount: number): Map<number, number> {
    const segmentsAmount = divisionsAmount - 1;
    if (segmentsAmount <= 1) {
      throw new Error('divisionsAmount must be greater or equal than 2');
    }
    const maxAndMinDifference = this.getMaxValue() - this.getMinValue();
    const valuesAndPercents = new Map<number, number>();
    let currentValue = this.getMinValue();
    let currentValueInPercents = 0;
    let grow = 0;
    while (grow < (maxAndMinDifference / segmentsAmount)) {
      grow += this.getStep();
    }
    do {
      currentValue = this.validateValue(currentValue);
      currentValueInPercents = this.convertValueToPercent(currentValue);
      valuesAndPercents.set(currentValue, currentValueInPercents);
      currentValue += grow;
    } while (currentValueInPercents < 100);
    return valuesAndPercents;
  }

  private init({ isRange = DefaultSliderOptions.isRange, minValue = DefaultSliderOptions.minValue,
                 maxValue = DefaultSliderOptions.maxValue, startValueLow = DefaultSliderOptions.startValueLow,
                 startValueHigh = DefaultSliderOptions.startValueHigh, step = DefaultSliderOptions.step,
               }: modelOptions): void {
    const isOptionsNotValid = (maxValue <= minValue) || (step <= 0);
    if (isOptionsNotValid) {
      throw new Error('options is not valid');
    }
    this.isRange = isRange;
    this.maxValue = maxValue;
    this.minValue = minValue;
    this.step = step;
    this.lowValue = this.minValue;
    this.highValue = this.maxValue;
    this.setLowValue(startValueLow);
    this.setHighValue(startValueHigh);
  }

  // Проверяет значение на то, что оно находится в промежутке [minValue: maxValue]
  // и изменяет его на ближайшее число,
  // которое соответствует шагу.
  private validateValue(value: number): number {
    let validatedValue;
    if (value <= this.minValue) {
      validatedValue = this.minValue;
    } else if (value >= this.maxValue) {
      validatedValue = this.maxValue;
    } else {
      const amountOfStepSegments = Math.round(
        Number(Big(value)
          .minus(this.getMinValue())
          .div(this.step)),
      );
      const lengthFromStart = Big(amountOfStepSegments).times(this.step);
      validatedValue = Number(Big(this.minValue).plus(lengthFromStart));
    }
    return validatedValue;
  }

  // Проверяет значение на то, что оно находится в промежутке [0; 100]
  // и изменяет его на ближайшее число,
  // которое соответствует шагу.
  private validateValueInPercent(value: number): number {
    let validatedValue;
    if (value >= 100) {
      validatedValue = 100;
    } else if (value <= 0) {
      validatedValue = 0;
    } else {
      const differenceBetweenMaxAndMin = Number(Big(this.maxValue).minus(this.minValue));
      const percentsInStep = Big(100 / differenceBetweenMaxAndMin).times(this.step);
      const amountOfStepBetweenMaxAndMin = Math.ceil(differenceBetweenMaxAndMin / this.step);
      const stepsInRange = Big(value).div(percentsInStep);
      const rangeLengthExceptLastStep = percentsInStep.times(amountOfStepBetweenMaxAndMin - 1);
      const lastStepLength = Big(100).minus(rangeLengthExceptLastStep);
      const isValueBiggerThanLastStepHalf = rangeLengthExceptLastStep
        .plus(lastStepLength.div(2)).lt(value);
      if (isValueBiggerThanLastStepHalf) {
        validatedValue = 100;
      } else {
        const amountOfStepSegments = Math.round(Number(stepsInRange));
        validatedValue = Number(Big(amountOfStepSegments).times(percentsInStep));
      }
    }
    return validatedValue;
  }

  private convertPercentToValue(valueInPercent: number): number {
    const differenceBetweenMaxAndMin = Big(this.maxValue).minus(this.minValue);
    const valuePartOfTotal = Big(valueInPercent).div(100);
    const value = Big(this.minValue).plus((valuePartOfTotal.times(differenceBetweenMaxAndMin)));
    return Number(value);
  }

  private convertValueToPercent(value: number): number {
    const differenceBetweenMaxAndMin = Big(this.maxValue).minus(this.minValue);
    const differenceBetweenValueAndMin = Big(value).minus(this.minValue);
    const valueInPercent = (differenceBetweenValueAndMin.div(differenceBetweenMaxAndMin))
      .times(100);
    return Number(valueInPercent);
  }
}

export default Model;
