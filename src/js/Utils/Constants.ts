import Orientation from './Orientation';

const CONSTANTS = {
  viewWrapperClassName: 'slider',
  orientationClassNames: new Map<Orientation, string>(
    [[Orientation.HORIZONTAL, 'slider_horizontal'], [Orientation.VERTICAL, 'slider_vertical']],
  ),
  rangeClassName: 'slider__range',
  scaleClassName: 'slider__scale',
  runnerClassName: 'slider__runner',
  stripClassName: 'slider__strip',
  scaleSubElementClassName: 'slider__scale-subelement',
  tipClassName: 'slider__tip',
  tipHiddenClassName: 'slider__tip_hidden',
  tipBellowClassName: 'slider__tip_below',
  tipsJoinDistance: 10
};

export default CONSTANTS;
