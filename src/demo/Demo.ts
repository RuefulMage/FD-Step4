import SliderOptions from '../Slider/Utils/SliderOptions';
import Slider from '../Slider/Slider';

class Demo {
  private sliderElement: JQuery<HTMLElement>;

  private panelElement: HTMLElement;

  private slider: Slider;

  private maxValueInput: HTMLInputElement;

  private minValueInput: HTMLInputElement;

  private lowValueInput: HTMLInputElement;

  private highValueInput: HTMLInputElement;

  private stepInput: HTMLInputElement;

  private isRangeInput: HTMLInputElement;

  private isTipsHiddenInput: HTMLInputElement;

  private isVerticalInput: HTMLInputElement;

  constructor(sliderElement: JQuery, panelElement: HTMLElement, sliderOptions: SliderOptions) {
    this.panelElement = panelElement;
    this.sliderElement = sliderElement;
    this.slider = sliderElement.slider(sliderOptions).data('slider');
    this.init();
  }

  private init(): void {
    this.initMaxValueInput();
    this.initMinValueInput();
    this.initLowValueInput();
    this.initHighValueInput();
    this.initStepInput();
    this.initRangeInput();
    this.initTipsHiddenInput();
    this.initIsVerticalInput();

    this.sliderElement.on('slider-change', this.handleSliderChange);
    this.handleSliderChange();
  }

  private handleSliderChange = (): void => {
    this.lowValueInput.value = this.slider.getLowValue().toString();
    this.highValueInput.value = this.slider.getHighValue().toString();
    this.minValueInput.value = this.slider.getMinValue().toString();
    this.maxValueInput.value = this.slider.getMaxValue().toString();
    this.stepInput.value = this.slider.getStep().toString();
    this.isTipsHiddenInput.checked = this.slider.getHideStatus();
    this.isRangeInput.checked = this.slider.isRange();
    if (this.slider.getOrientation() === 'vertical') {
      this.isVerticalInput.checked = true;
    } else {
      this.isVerticalInput.checked = false;
    }
  };

  private initMaxValueInput(): void {
    this.maxValueInput = this.panelElement.querySelector('.js-max-value');

    this.maxValueInput.addEventListener('change', this.handleMaxValueChange);
  }

  private handleMaxValueChange = (event: Event) => {
    const isChangeSuccessful = this.slider.setMaxValue(Number(this.maxValueInput.value));

    if (!isChangeSuccessful) {
      // eslint-disable-next-line no-param-reassign
      (event.target as HTMLInputElement).value = this.slider.getMaxValue().toString();
    }
  };

  private initMinValueInput(): void {
    this.minValueInput = this.panelElement.querySelector('.js-min-value');
    this.minValueInput.addEventListener('change', this.handleMinValueChange);
  }

  private handleMinValueChange = (event: Event): void => {
    const isChangeSuccessful = this.slider.setMinValue(Number(this.minValueInput.value));

    if (!isChangeSuccessful) {
      // eslint-disable-next-line no-param-reassign
      (event.target as HTMLInputElement).value = this.slider.getMinValue().toString();
    }
  };

  private initLowValueInput(): void {
    this.lowValueInput = this.panelElement.querySelector('.js-low-value');
    this.lowValueInput.addEventListener('change', this.handleLowValueChange);
  }

  private handleLowValueChange = () => {
    this.slider.setLowValue(Number(this.lowValueInput.value));
  };

  private initHighValueInput(): void {
    this.highValueInput = this.panelElement.querySelector('.js-high-value');
    this.highValueInput.addEventListener('change', this.handleHighValueChange);
  }

  private handleHighValueChange = () => {
    this.slider.setHighValue(Number(this.highValueInput.value));
  };

  private initStepInput(): void {
    this.stepInput = this.panelElement.querySelector('.js-step');
    this.stepInput.addEventListener('change', this.handleStepChange);
  }

  private handleStepChange = (event: Event) => {
    const isChangeSuccessful = this.slider.setStep(Number(this.stepInput.value));

    if (!isChangeSuccessful) {
      // eslint-disable-next-line no-param-reassign
      (event.target as HTMLInputElement).value = Number(this.slider.getStep()).toString();
    }
  };

  private initRangeInput(): void {
    this.isRangeInput = this.panelElement.querySelector('.js-range');
    this.isRangeInput.addEventListener('change', this.handleRangeChange);
  }

  private handleRangeChange = () => {
    this.slider.setRangeMode(this.isRangeInput.checked);
    if (!this.isRangeInput.checked) {
      this.highValueInput.disabled = true;
    } else {
      this.highValueInput.disabled = false;
    }
  };

  private initTipsHiddenInput(): void {
    this.isTipsHiddenInput = this.panelElement.querySelector('.js-tips-hidden');
    this.isTipsHiddenInput.addEventListener('change', this.handleTipsHiddenInputChange);
  }

  private handleTipsHiddenInputChange = () => {
    if (this.isTipsHiddenInput.checked) {
      this.slider.hideTips();
    } else {
      this.slider.showTips();
    }
  };

  private initIsVerticalInput(): void {
    this.isVerticalInput = this.panelElement.querySelector('.js-vertical');
    this.isVerticalInput.addEventListener('change', this.handleIsVerticalInputChange);
  }

  private handleIsVerticalInputChange = () => {
    if (this.isVerticalInput.checked) {
      this.slider.setOrientation('vertical');
    } else {
      this.slider.setOrientation('horizontal');
    }
  };
}

export default Demo;
