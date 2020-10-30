import SliderOptions from '../Slider/Utils/SliderOptions';
import Slider from '../Slider/Slider';
declare class Demo {
    protected sliderElement: JQuery<HTMLElement>;
    protected panelElement: HTMLElement;
    protected slider: Slider;
    protected maxValueInput: HTMLInputElement;
    protected minValueInput: HTMLInputElement;
    protected lowValueInput: HTMLInputElement;
    protected highValueInput: HTMLInputElement;
    protected stepInput: HTMLInputElement;
    protected isRangeInput: HTMLInputElement;
    protected isTipsHiddenInput: HTMLInputElement;
    protected isVerticalInput: HTMLInputElement;
    constructor(sliderElement: JQuery, panelElement: HTMLElement, sliderOptions: SliderOptions);
    init(): void;
    private initMaxValueInput;
    private initMinValueInput;
    private initLowValueInput;
    private initHighValueInput;
    private initStepInput;
    private initRangeInput;
    private initTipsHiddenInput;
    private initIsVerticalInput;
}
export default Demo;
