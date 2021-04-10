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

enum Orientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

type SliderOptions = {
  isRange: boolean,
  isTipsHidden: boolean,
  maxValue: number,
  minValue: number,
  orientation: 'horizontal' | 'vertical',
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

export {
  Logger,
  ModelEventName,
  ViewEventName,
  Orientation,
  SliderOptions,
  DefaultSliderOptions
};