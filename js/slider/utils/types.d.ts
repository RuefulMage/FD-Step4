declare const Logger: {
    logWarning(moduleName: string, message: string): void;
    logInfo(moduleName: string, message: string): void;
    logError(moduleName: string, message: string): void;
};
declare type Orientation = 'horizontal' | 'vertical';
declare type SliderOptions = {
    isRange: boolean;
    isTipsExists: boolean;
    maxValue: number;
    minValue: number;
    orientation: Orientation;
    highValue: number;
    lowValue: number;
    step: number;
};
declare const DefaultSliderOptions: SliderOptions;
export { Logger, Orientation, SliderOptions, DefaultSliderOptions, };
