import { SliderOptions } from '../slider/utils/types';
import Slider from '../slider/Slider';

class Demo {
  private slider: Slider;

  private maxValueInput: HTMLInputElement;

  private minValueInput: HTMLInputElement;

  private lowValueInput: HTMLInputElement;

  private highValueInput: HTMLInputElement;

  private stepInput: HTMLInputElement;

  private isRangeInput: HTMLInputElement;

  private isTipsExistsInput: HTMLInputElement;

  private isVerticalInput: HTMLInputElement;

  constructor(private sliderElement: JQuery,
    private panelElement: HTMLElement, sliderOptions: SliderOptions) {
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
    this.initTipsExistsInput();
    this.initIsVerticalInput();
    this.sliderElement.on('slider-change', this.handleSliderChange);
    this.handleSliderChange();
  }

  private handleSliderChange = (): void => {
    this.highValueInput.value = this.slider.getHighValue().toString();
    this.minValueInput.value = this.slider.getMinValue().toString();
    this.maxValueInput.value = this.slider.getMaxValue().toString();
    this.stepInput.value = this.slider.getStep().toString();
    this.isTipsExistsInput.checked = this.slider.getTipsExistStatus();
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
    const input = (event.target as HTMLInputElement);
    const isChangeSuccessful = this.slider.setMaxValue(Number(input.value));

    if (!isChangeSuccessful) {
      input.value = this.slider.getMaxValue().toString();
    }
  };

  private initMinValueInput(): void {
    this.minValueInput = this.panelElement.querySelector('.js-min-value');
    this.minValueInput.addEventListener('change', this.handleMinValueChange);
  }

  private handleMinValueChange = (event: Event): void => {
    const input = (event.target as HTMLInputElement);
    const isChangeSuccessful = this.slider.setMinValue(Number(input.value));

    if (!isChangeSuccessful) {
      // eslint-disable-next-line no-param-reassign
      input.value = this.slider.getMinValue().toString();
    }
  };

  private initLowValueInput(): void {
    this.lowValueInput = this.panelElement.querySelector('.js-low-value');
    this.lowValueInput.addEventListener('change', this.handleLowValueChange);
  }

  private handleLowValueChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.slider.setLowValue(Number(input.value));
  };

  private initHighValueInput(): void {
    this.highValueInput = this.panelElement.querySelector('.js-high-value');
    this.highValueInput.addEventListener('change', this.handleHighValueChange);
  }

  private handleHighValueChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.slider.setHighValue(Number(input.value));
  };

  private initStepInput(): void {
    this.stepInput = this.panelElement.querySelector('.js-step');
    this.stepInput.addEventListener('change', this.handleStepChange);
  }

  private handleStepChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const isChangeSuccessful = this.slider.setStep(Number(input.value));

    if (!isChangeSuccessful) {
      // eslint-disable-next-line no-param-reassign
      (event.target as HTMLInputElement).value = Number(this.slider.getStep()).toString();
    }
  };

  private initRangeInput(): void {
    this.isRangeInput = this.panelElement.querySelector('.js-range');
    this.isRangeInput.addEventListener('change', this.handleRangeChange);
  }

  private handleRangeChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.slider.setRangeMode(input.checked);
    if (!input.checked) {
      this.highValueInput.disabled = true;
    } else {
      this.highValueInput.disabled = false;
    }
  };

  private initTipsExistsInput(): void {
    this.isTipsExistsInput = this.panelElement.querySelector('.js-tips-showed');
    this.isTipsExistsInput.addEventListener('change', this.handleTipsExistsInputChange);
  }

  private handleTipsExistsInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.slider.showTips();
    } else {
      this.slider.hideTips();
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
