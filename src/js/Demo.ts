import { Slider } from './Slider';

export class Demo{

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

    constructor(sliderElement: JQuery, panelElement: HTMLElement, minValue = -100, maxValue = 100, step = 1,
                isRange = false, isTipsHidden = false, orientation = 'horizontal', divisionsAmount = 2, startLowValue = minValue,
                startHighValue = 100) {
        this.panelElement = panelElement;
        this.sliderElement = sliderElement;
        console.log(startHighValue);
        this.slider = sliderElement.slider({
            divisionsAmount: divisionsAmount,
            isRange: isRange,
            isTipsHidden: isTipsHidden,
            maxValue: maxValue,
            minValue: minValue,
            orientation: orientation,
            startValueHigh: startHighValue,
            startValueLow: startLowValue,
            step: step
        }).data('slider');
        this.init();
    }

    init(): void{
        let that = this;
        this.maxValueInput = this.panelElement.querySelector('.js-max-value');
        this.maxValueInput.addEventListener('change', function() {
            this.min = Number(2).toString();
            that.slider.setMaxValue(Number(this.value));
        });

        this.minValueInput = this.panelElement.querySelector('.js-min-value');
        this.minValueInput.addEventListener('change', function() {
            that.slider.setMinValue(Number(this.value));
        });

        this.lowValueInput = this.panelElement.querySelector('.js-low-value');
        this.lowValueInput.addEventListener('change', function() {
            that.slider.setLowValue(Number(this.value));
        });

        this.highValueInput = this.panelElement.querySelector('.js-high-value');
        this.highValueInput.addEventListener('change', function() {
            that.slider.setHighValue(Number(this.value));
        });

        this.stepInput = this.panelElement.querySelector('.js-step');
        this.stepInput.addEventListener('change', function() {
            that.slider.setStep(Number(this.value));
        });

        this.divisionAmountInput = this.panelElement.querySelector('.js-divisions-amount');
        this.divisionAmountInput.addEventListener('change', function() {
            that.slider.setDivisionsAmount(Number(this.value));
        });

        this.isRangeInput = this.panelElement.querySelector('.js-range');
        this.isRangeInput.addEventListener('change', function() {
            that.slider.setRangeMode(this.checked);
            if(!this.checked){
                that.highValueInput.disabled = true;
            }
        });

        this.isTipsHiddenInput = this.panelElement.querySelector('.js-tips-hidden');
        this.isTipsHiddenInput.addEventListener('change', function() {
            if( this.checked ){
                that.slider.hideTips();
            } else {
                that.slider.showTips();
            }
        });


        this.isVerticalInput = this.panelElement.querySelector('.js-vertical');
        this.isVerticalInput.addEventListener('change', function() {
            if( this.checked ){
                that.slider.setOrientation('vertical');
            } else {
                that.slider.setOrientation('horizontal');
            }
        });


        this.sliderElement.on('slider-change', function() {
            that.lowValueInput.value = that.slider.getLowValue().toString();
            that.highValueInput.value = that.slider.getHighValue().toString();
            that.minValueInput.value = that.slider.getMinValue().toString();
            that.maxValueInput.value = that.slider.getMaxValue().toString();
            that.stepInput.value = that.slider.getStep().toString();
        })
    }
}