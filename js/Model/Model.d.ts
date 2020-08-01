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
    protected observers: Set<IObserver>;
    constructor(options: ModelOptions);
    getRangeStatus(): boolean;
    setRangeMode(isRange: boolean): void;
    getMaxValue(): number;
    setMaxValue(value: number): void;
    getMinValue(): number;
    setMinValue(value: number): void;
    getLowValue(): number;
    getLowValueInPercents(): number;
    setLowValue(value: number): void;
    setLowValueByPercents(percent: number): void;
    getHighValue(): number;
    getHighValueInPercents(): number;
    setHighValueByPercents(percent: number): void;
    setHighValue(value: number): void;
    getStep(): number;
    setStep(value: number): void;
    protected validateValue(value: number): number;
    protected validateValueInPercent(value: number): number;
    protected convertPercentToValue(percent: number): number;
    protected convertValueToPercent(value: number): number;
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(eventType: string, data?: any): void;
}
