import IObserver from './Observer/IObserver';
import View from './View/ViewComponents/View';
import Model from './Model/Model';
import Controller from './Controller/Controller';
import SliderOptions from './Utils/SliderOptions';
import Orientation from './Utils/Orientation';
import Logger from './Utils/Logger';

class Slider implements IObserver {
  protected view: View;

  protected model: Model;

  protected controller: Controller;

  protected rootElement: HTMLElement;

  constructor(rootElement: HTMLElement, options: SliderOptions) {
    this.rootElement = rootElement;
    this.model = new Model(options);
    this.model.attach(this);

    const viewOptions: {
      orientation?: Orientation, isRange?: boolean, isTipsHidden?: boolean
    } = {
      orientation: options.orientation as Orientation,
      isRange: options.isRange,
      isTipsHidden: options.isTipsHidden,
    };
    this.view = new View(rootElement, viewOptions);
    this.view.attach(this);
    this.controller = new Controller(this.view, this.model);
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

  public setOrientation(orientation: string): void {
    this.view.setOrientation(orientation as Orientation);
  }

  public hideTips(): void {
    this.view.hideTips();
  }

  public showTips(): void {
    this.view.showTips();
  }

  public getHideStatus(): boolean {
    return this.view.getHideStatus();
  }

  public update(eventName: string, data?: any): void {
    const changeEvent = new CustomEvent('slider-change', { bubbles: true, cancelable: true });
    this.rootElement.dispatchEvent(changeEvent);
  }
}

(function ($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.slider = function (userOptions: SliderOptions) {
    const options = $.extend(true, $.fn.slider.defaultOptions, userOptions);

    return this.each(function () {
      if (!$(this).data('slider')) {
        const slider = new Slider(this, options);
        $(this).data('slider', slider);
      }
    });
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.slider.defaultOptions = {
    isRange: false,
    isTipsHidden: false,
    maxValue: 100,
    minValue: 0,
    orientation: 'horizontal',
    startValueHigh: 100,
    startValueLow: 0,
    step: 1,
  };
}(jQuery));

export default Slider;
