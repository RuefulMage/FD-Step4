import View from './view/viewComponents/view/View';
import Model from './model/Model';
import Controller from './controller/Controller';
import {
  Logger, DefaultSliderOptions, Orientation, SliderOptions,
} from './utils/types';

class Slider {
  private readonly view: View;

  private readonly model: Model;

  constructor(private rootElement: HTMLElement, options: SliderOptions) {
    try {
      this.model = new Model(options);
    } catch (error) {
      const validOptions = {
        isRange: options.isRange,
        isTipsExists: options.isTipsExists,
        maxValue: DefaultSliderOptions.maxValue,
        minValue: DefaultSliderOptions.minValue,
        highValue: options.highValue,
        lowValue: options.lowValue,
        step: DefaultSliderOptions.step,
      };
      this.model = new Model(validOptions);
    }
    this.model.attach(this.update.bind(this));

    const isOrientationValueIsValid = (options.orientation === 'horizontal') || (options.orientation === 'vertical');
    const validOrientation: Orientation = isOrientationValueIsValid ? options.orientation
      : DefaultSliderOptions.orientation;

    const viewOptions: {
      orientation?: Orientation, isRange?: boolean, isTipsExists?: boolean
    } = {
      orientation: validOrientation,
      isRange: options.isRange,
      isTipsExists: options.isTipsExists,
    };
    this.view = new View(rootElement, viewOptions);
    this.view.attach(this.update.bind(this));
    (() => new Controller(this.view, this.model))();
  }

  public isRange(): boolean {
    return this.model.getRangeStatus();
  }

  public setRangeMode(isRange: boolean): void {
    this.model.setRangeMode(isRange);
  }

  public getMinValue(): number {
    return this.model.getMinValue();
  }

  public setMinValue(minValue: number): boolean {
    try {
      this.model.setMinValue(minValue);
      return true;
    } catch (error) {
      Logger.logWarning('Model', error.message);
      return false;
    }
  }

  public getMaxValue(): number {
    return this.model.getMaxValue();
  }

  public setMaxValue(maxValue: number): boolean {
    try {
      this.model.setMaxValue(maxValue);
      return true;
    } catch (error) {
      Logger.logWarning('Model', error.message);
      return false;
    }
  }

  public getHighValue(): number {
    return this.model.getHighValue();
  }

  public setHighValue(highValue: number): void {
    this.model.setHighValue(highValue);
  }

  public getLowValue(): number {
    return this.model.getLowValue();
  }

  public setLowValue(lowValue: number): void {
    this.model.setLowValue(lowValue);
  }

  public getStep(): number {
    return this.model.getStep();
  }

  public setStep(step: number): boolean {
    try {
      this.model.setStep(step);
      return true;
    } catch (error) {
      Logger.logWarning('Model', error.message);
      return false;
    }
  }

  public getOrientation(): string {
    return this.view.getOrientation();
  }

  public setOrientation(orientation: Orientation): void {
    this.view.setOrientation(orientation);
  }

  public hideTips(): void {
    this.view.deleteTips();
  }

  public showTips(): void {
    this.view.createTips();
  }

  public getTipsExistStatus(): boolean {
    return this.view.getTipsExistStatus();
  }

  public update(): void {
    const changeEvent = new CustomEvent('slider-change', { bubbles: true, cancelable: true });
    this.rootElement.dispatchEvent(changeEvent);
  }
}

(function ($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.slider = function (userOptions: SliderOptions) {
    const options = $.extend(true, {}, DefaultSliderOptions, userOptions);

    return this.each(function () {
      if (!$(this).data('slider')) {
        const slider = new Slider(this, options);
        $(this).data('slider', slider);
      }
    });
  };
}(jQuery));

export default Slider;
