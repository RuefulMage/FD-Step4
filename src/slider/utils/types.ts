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

type Orientation = 'horizontal' | 'vertical';

type SliderOptions = {
  isRange: boolean,
  isTipsExists: boolean,
  maxValue: number,
  minValue: number,
  orientation: Orientation,
  highValue: number,
  lowValue: number,
  step: number
};

const DefaultSliderOptions: SliderOptions = {
  isRange: false,
  isTipsExists: false,
  maxValue: 100,
  minValue: 0,
  orientation: 'horizontal',
  highValue: 100,
  lowValue: 0,
  step: 1,
};
export {
  Logger,
  Orientation,
  SliderOptions,
  DefaultSliderOptions,
};
