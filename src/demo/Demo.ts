import SliderOptions from '../Slider/Utils/SliderOptions';
import Slider from '../Slider/Slider';

class Demo {
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

  constructor(sliderElement: JQuery, panelElement: HTMLElement, sliderOptions: SliderOptions) {
    this.panelElement = panelElement;
    this.sliderElement = sliderElement;
    this.slider = sliderElement.slider(sliderOptions).data('slider');
    this.init();
  }

  init(): void {
    this.initMaxValueInput();
    this.initMinValueInput();
    this.initLowValueInput();
    this.initHighValueInput();
    this.initStepInput();
    this.initRangeInput();
    this.initTipsHiddenInput();
    this.initIsVerticalInput();

    const that = this;

    function handleSliderChange(): void {
      that.lowValueInput.value = that.slider.getLowValue().toString();
      that.highValueInput.value = that.slider.getHighValue().toString();
      that.minValueInput.value = that.slider.getMinValue().toString();
      that.maxValueInput.value = that.slider.getMaxValue().toString();
      that.stepInput.value = that.slider.getStep().toString();
      that.isTipsHiddenInput.checked = that.slider.getHideStatus();
      that.isRangeInput.checked = that.slider.isRange();
      if (that.slider.getOrientation() === 'vertical') {
        that.isVerticalInput.checked = true;
      } else {
        that.isVerticalInput.checked = false;
      }
    }

    this.sliderElement.on('slider-change', handleSliderChange);
    handleSliderChange();
  }

  private initMaxValueInput(): void {
    const that = this;
    this.maxValueInput = this.panelElement.querySelector('.js-max-value');

    function handleMaxValueChange(event: Event) {
      const isChangeSuccessful = that.slider.setMaxValue(Number(that.maxValueInput.value));

      if (!isChangeSuccessful) {
        // eslint-disable-next-line no-param-reassign
        (event.target as HTMLInputElement).value = that.slider.getMaxValue().toString();
      }
    }

    this.maxValueInput.addEventListener('change', handleMaxValueChange);
  }

  private initMinValueInput(): void {
    const that = this;
    this.minValueInput = this.panelElement.querySelector('.js-min-value');

    function handleMinValueChange(event: Event): void {
      const isChangeSuccessful = that.slider.setMinValue(Number(that.minValueInput.value));

      if (!isChangeSuccessful) {
        // eslint-disable-next-line no-param-reassign
        (event.target as HTMLInputElement).value = that.slider.getMinValue().toString();
      }
    }

    this.minValueInput.addEventListener('change', handleMinValueChange);
  }

  private initLowValueInput(): void {
    const that = this;
    this.lowValueInput = this.panelElement.querySelector('.js-low-value');

    function lowValueChangeHandler() {
      that.slider.setLowValue(Number(that.lowValueInput.value));
    }

    this.lowValueInput.addEventListener('change', lowValueChangeHandler);
  }

  private initHighValueInput(): void {
    const that = this;
    this.highValueInput = this.panelElement.querySelector('.js-high-value');

    function highValueChangeHandler() {
      that.slider.setHighValue(Number(that.highValueInput.value));
    }

    this.highValueInput.addEventListener('change', highValueChangeHandler);
  }

  private initStepInput(): void {
    const that = this;
    this.stepInput = this.panelElement.querySelector('.js-step');

    function stepChangeHandler(event: Event) {
      const isChangeSuccessful = that.slider.setStep(Number(that.stepInput.value));

      if (!isChangeSuccessful) {
        // eslint-disable-next-line no-param-reassign
        (event.target as HTMLInputElement).value = Number(that.slider.getStep()).toString();
      }
    }

    this.stepInput.addEventListener('change', stepChangeHandler);
  }

  private initRangeInput(): void {
    const that = this;
    this.isRangeInput = this.panelElement.querySelector('.js-range');

    function rangeChangeHandler() {
      that.slider.setRangeMode(that.isRangeInput.checked);
      if (!that.isRangeInput.checked) {
        that.highValueInput.disabled = true;
      } else {
        that.highValueInput.disabled = false;
      }
    }

    this.isRangeInput.addEventListener('change', rangeChangeHandler);
  }

  private initTipsHiddenInput(): void {
    const that = this;
    this.isTipsHiddenInput = this.panelElement.querySelector('.js-tips-hidden');

    function tipsHiddenInputChangeHandler() {
      if (that.isTipsHiddenInput.checked) {
        that.slider.hideTips();
      } else {
        that.slider.showTips();
      }
    }

    this.isTipsHiddenInput.addEventListener('change', tipsHiddenInputChangeHandler);
  }

  private initIsVerticalInput(): void {
    const that = this;
    this.isVerticalInput = this.panelElement.querySelector('.js-vertical');

    function isVerticalInputChangeHandler() {
      if (that.isVerticalInput.checked) {
        that.slider.setOrientation('vertical');
      } else {
        that.slider.setOrientation('horizontal');
      }
    }

    this.isVerticalInput.addEventListener('change', isVerticalInputChangeHandler);
  }
}

export default Demo;
