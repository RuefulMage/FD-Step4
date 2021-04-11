import { Orientation } from './types';

const Constants = {
  viewWrapperClassName: 'slider',
  orientationClassNames: new Map<Orientation, string>(
    [['horizontal', 'slider_horizontal'], ['vertical', 'slider_vertical']],
  ),
  rangeClassName: 'slider__range',
  scaleClassName: 'slider__scale',
  runnerClassName: 'slider__runner',
  runnerPrefixedClassName: 'js-slider__runner',
  runnerCurrentModifier: 'slider__runner_current',
  stripClassName: 'slider__strip',
  scaleSubElementClassName: 'slider__scale-subelement',
  scaleSubElementMaxAmount: 10,
  tipClassName: 'slider__tip',
  tipHiddenClassName: 'slider__tip_hidden',
  tipBellowClassName: 'slider__tip_below',
  tipsJoinDistance: 15,
};

export default Constants;
