import Slider from './Slider';
import SliderOptions from './Utils/SliderOptions';
export default class Demo {
    protected sliderElement: JQuery<HTMLElement>;
    protected panelElement: HTMLElement;
    protected slider: Slider;
    protected maxValueInput: HTMLInputElement;
    protected minValueInput: HTMLInputElement;
    protected lowValueInput: HTMLInputElement;
    protected highValueInput: HTMLInputElement;
    protected stepInput: HTMLInputElement;
    protected divisionAmountInput: HTMLInputElement;
    protected isRangeInput: HTMLInputElement;
    protected isTipsHiddenInput: HTMLInputElement;
    protected isVerticalInput: HTMLInputElement;
    constructor(sliderElement: JQuery, panelElement: HTMLElement, sliderOptions: SliderOptions);
    init(): void;
    private maxValueInputInit;
    private minValueInputInit;
    private lowValueInputInit;
    private highValueInputInit;
    private stepInputInit;
    private divisionAmountInputInit;
    private rangeInputInit;
    private tipsHiddenInputInit;
    private isVerticalInputInit;
}
