// import './Slider/Slider';

// let b = $('.js-slider').slider({});
// console.log(b);

import './Slider/slider.scss';

// import './demo/demo.scss';
// import './index.scss';
import Slider from './Slider/Slider';
import SliderOptions from './Slider/Utils/SliderOptions';
// import './demo/init';

declare global {
  interface JQuery {
    slider: any;
  }
}

(function ($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.slider = function (userOptions: SliderOptions) {
    var options = $.extend(true, $.fn.slider.defaultOptions, userOptions);
    return this.each(function () {
      if (!$(this).data('slider')) {
        var slider = new Slider(this, options);
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
    step: 1
  };
}(jQuery));
