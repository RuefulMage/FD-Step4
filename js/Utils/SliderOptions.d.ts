import Orientation from './Orientation';
declare type SliderOptions = {
    divisionsAmount: number;
    isRange: boolean;
    isTipsHidden: boolean;
    maxValue: number;
    minValue: number;
    orientation: Orientation;
    startValueHigh: number;
    startValueLow: number;
    step: number;
};
export default SliderOptions;
