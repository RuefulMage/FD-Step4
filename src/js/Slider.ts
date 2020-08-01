import Controller from './Controller/Controller';
import Model from './Model/Model';
import View from './View/ViewComponents/View';
import IObserver from './Observer/IObserver';
import Orientation from './Utils/Orientation';
import SliderOptions from './Utils/SliderOptions';

export default class Slider implements IObserver {
    protected view: View;

    protected model: Model;

    protected controller: Controller;

    protected rootElement: HTMLElement;

    constructor(rootElement: HTMLElement, options: SliderOptions) {
      this.rootElement = rootElement;
      this.model = new Model(options);
      this.model.attach(this);
      this.view = new View(rootElement, options);
      this.view.attach(this);
      this.controller = new Controller(this.view, this.model, options.isRange);
    }

    isRange(): boolean {
      return this.model.getRangeStatus();
    }

    getMinValue(): number {
      return this.model.getMinValue();
    }

    getMaxValue(): number {
      return this.model.getMaxValue();
    }

    getHighValue(): number {
      return this.model.getHighValue();
    }

    getLowValue(): number {
      return this.model.getLowValue();
    }

    getStep(): number {
      return this.model.getStep();
    }

    setStep(step: number) {
      this.model.setStep(step);
    }

    setMaxValue(maxValue: number) {
      this.model.setMaxValue(maxValue);
    }

    setMinValue(minValue: number) {
      this.model.setMinValue(minValue);
    }

    setLowValue(lowValue: number) {
      this.model.setLowValue(lowValue);
    }

    setHighValue(highValue: number) {
      this.model.setHighValue(highValue);
    }

    setRangeMode(isRange: boolean) {
      this.model.setRangeMode(isRange);
    }

    getOrientation(): string {
      return this.view.getOrientation();
    }

    setOrientation(orientation: string) {
      this.view.setOrientation(orientation as Orientation);
    }

    hideTips() {
      this.view.hideTips();
    }

    showTips() {
      this.view.showTips();
    }

    getHideStatus(): boolean {
      return this.view.getHideStatus();
    }

    getDivisionsAmount(): number {
      return this.view.getDivisionsAmount();
    }

    setDivisionsAmount(divisionsAmount: number) {
      this.view.setScaleDivisionsAmount(divisionsAmount);
    }

    update(eventName: string, data?: any): void {
      const changeEvent = new CustomEvent('slider-change', { bubbles: true, cancelable: true });
      this.rootElement.dispatchEvent(changeEvent);
    }
}

(function ($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.slider = function (userOptions: SliderOptions) {
    const options = $.extend(true, $.fn.slider.defaultOptions, userOptions);

    // eslint-disable-next-line no-param-reassign
    return this.each(function () {
      if (!$(this).data('slider')) {
        const slider = new Slider(this, options);
        $(this).data('slider', slider);
      }
    });
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.slider.defaultOptions = {
    divisionsAmount: 2,
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
