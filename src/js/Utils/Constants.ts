import { Orientation } from './types';

export let constants = {
    viewWrapperClassName: 'slider',
    orientationClassNames: new Map<Orientation,string>(
        [[Orientation.HORIZONTAL,'slider_horizontal'], [Orientation.VERTICAL, 'slider_vertical']]),
    rangeClassName: 'slider__range',
    scaleClassName: 'slider__scale',
    runnerClassName: 'slider__runner',
    stripClassName: 'slider__strip',
    scaleSubElementClassName: 'slider__scale-subelement',
    tipClassName: 'slider__tip',
    tipHiddenClassName: 'slider__tip_hidden',
    tipBellowClassName: 'slider__tip_below',
}