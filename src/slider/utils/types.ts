import OrientationBehavior from '../view/orientationBehaviors/OrientationBehavior';

const Logger = {

  logWarning(moduleName: string, message: string) {
    console.warn(`[WARNING] ${new Date()} in ${moduleName}\n${message}`);
  },

  logInfo(moduleName: string, message: string) {
    console.info(`[INFO] ${new Date()} in ${moduleName}\n${message}`);
  },

  logError(moduleName: string, message: string) {
    console.error(`[Error] ${new Date()} in ${moduleName}\n${message}`);
  },
};

type ModelEventName = 'edge-value-change' | 'value-change'|'range-mode-change' | 'step-change';
type ViewEventName = 'position-change-by-drag' | 'position-change-by-click' | 'resize' | 'orientation-change';

type Orientation = 'horizontal' | 'vertical';

type SliderOptions = {
  isRange: boolean,
  isTipsHidden: boolean,
  maxValue: number,
  minValue: number,
  orientation: Orientation,
  startValueHigh: number,
  startValueLow: number,
  step: number
};

const DefaultSliderOptions: SliderOptions = {
  isRange: false,
  isTipsHidden: false,
  maxValue: 100,
  minValue: 0,
  orientation: 'horizontal',
  startValueHigh: 100,
  startValueLow: 0,
  step: 1,
};

interface basicViewComponentOptions {
  parentNode: HTMLElement,
  orientationBehavior: OrientationBehavior,
}

interface updateViewOptions {
  runnersPositions: number[],
  tipsValues: number[],
  scalePositions?: Map<number, number>,
  isRange?: boolean
}

interface positionOptions {
  index: 0 | 1,
  position: number,
}

interface viewOptions {
  orientation?: Orientation,
  isRange?: boolean,
  isTipsHidden?: boolean
}

interface modelOptions {
  isRange?: boolean, minValue?: number,
  maxValue?: number, startValueLow?: number,
  startValueHigh?: number, step?: number
}

export {
  Logger,
  ModelEventName,
  ViewEventName,
  Orientation,
  SliderOptions,
  DefaultSliderOptions,
  basicViewComponentOptions,
  updateViewOptions,
  positionOptions,
  viewOptions,
  modelOptions
};