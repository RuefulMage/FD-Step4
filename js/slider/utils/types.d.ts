import OrientationBehavior from '../view/orientationBehaviors/OrientationBehavior';
declare const Logger: {
    logWarning(moduleName: string, message: string): void;
    logInfo(moduleName: string, message: string): void;
    logError(moduleName: string, message: string): void;
};
declare type ModelEventName = 'edge-value-change' | 'value-change' | 'range-mode-change' | 'step-change';
declare type ViewEventName = 'position-change-by-drag' | 'position-change-by-click' | 'resize' | 'orientation-change';
declare type Orientation = 'horizontal' | 'vertical';
declare type SliderOptions = {
    isRange: boolean;
    isTipsHidden: boolean;
    maxValue: number;
    minValue: number;
    orientation: Orientation;
    startValueHigh: number;
    startValueLow: number;
    step: number;
};
declare const DefaultSliderOptions: SliderOptions;
interface basicViewComponentOptions {
    parentNode: HTMLElement;
    orientationBehavior: OrientationBehavior;
}
interface updateViewOptions {
    runnersPositions: number[];
    tipsValues: number[];
    scalePositions?: Map<number, number>;
    isRange?: boolean;
}
interface positionOptions {
    index: 0 | 1;
    position: number;
}
interface viewOptions {
    orientation?: Orientation;
    isRange?: boolean;
    isTipsHidden?: boolean;
}
interface modelOptions {
    isRange?: boolean;
    minValue?: number;
    maxValue?: number;
    startValueLow?: number;
    startValueHigh?: number;
    step?: number;
}
export { Logger, ModelEventName, ViewEventName, Orientation, SliderOptions, DefaultSliderOptions, basicViewComponentOptions, updateViewOptions, positionOptions, viewOptions, modelOptions };
