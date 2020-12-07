import SliderOptions from './Utils/SliderOptions';
declare class Slider {
    private view;
    private model;
    private controller;
    private rootElement;
    constructor(rootElement: HTMLElement, options: SliderOptions);
    isRange(): boolean;
    setRangeMode(isRange: boolean): void;
    getMinValue(): number;
    setMinValue(minValue: number): boolean;
    getMaxValue(): number;
    setMaxValue(maxValue: number): boolean;
    getHighValue(): number;
    setHighValue(highValue: number): void;
    getLowValue(): number;
    setLowValue(lowValue: number): void;
    getStep(): number;
    setStep(step: number): boolean;
    getOrientation(): string;
    setOrientation(orientation: 'horizontal' | 'vertical'): void;
    hideTips(): void;
    showTips(): void;
    getHideStatus(): boolean;
    update(): void;
}
export default Slider;
