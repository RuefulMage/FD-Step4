import './Slider';
import '../scss/app.scss';
import Demo from './Demo';
import SliderOptions from './Utils/SliderOptions';
import Orientation from './Utils/Orientation';

const sliders = $('.sel');
const panels = $('.js-panel');
let panel = $('.js-panel').get(0);
let slider = sliders.get(0);

const sliderOptions: SliderOptions = {
  divisionsAmount: 5,
  isRange: true,
  isTipsHidden: true,
  maxValue: 500,
  minValue: 0,
  orientation: 'horizontal' as Orientation,
  startValueHigh: 300,
  startValueLow: 45,
  step: 5,
}
const demo_1 = new Demo($(slider), panel, sliderOptions);

panel = panels.get(1);
slider = sliders.get(1);
sliderOptions.isRange = false;
sliderOptions.isTipsHidden = false;
sliderOptions.step = 8;
sliderOptions.divisionsAmount = 3;

const demo_2 = new Demo($(slider), panel, sliderOptions);

panel = panels.get(2);
slider = sliders.get(2);
sliderOptions.isRange = true;
sliderOptions.orientation = 'vertical' as Orientation;
sliderOptions.step = 3;

const demo_3 = new Demo($(slider), panel, sliderOptions);
