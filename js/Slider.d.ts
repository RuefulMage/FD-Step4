import Controller from './Controller/Controller';
import Model from './Model/Model';
import View from './View/ViewComponents/View';
import IObserver from './Observer/IObserver';
import SliderOptions from './Utils/SliderOptions';
export default class Slider implements IObserver {
    protected view: View;
    protected model: Model;
    protected controller: Controller;
    protected rootElement: HTMLElement;
    constructor(rootElement: HTMLElement, options: SliderOptions);
    isRange(): boolean;
    getMinValue(): number;
    getMaxValue(): number;
    getHighValue(): number;
    getLowValue(): number;
    getStep(): number;
    setStep(step: number): void;
    setMaxValue(maxValue: number): void;
    setMinValue(minValue: number): void;
    setLowValue(lowValue: number): void;
    setHighValue(highValue: number): void;
    setRangeMode(isRange: boolean): void;
    getOrientation(): string;
    setOrientation(orientation: string): void;
    hideTips(): void;
    showTips(): void;
    getHideStatus(): boolean;
    setDivisionsAmount(divisionsAmount: number): void;
    update(eventName: string, data?: any): void;
}