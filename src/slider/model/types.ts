type ModelEventName = 'edge-value-change' | 'value-change'|'range-mode-change' | 'step-change';

interface ModelOptions {
  isRange?: boolean, minValue?: number,
  maxValue?: number, startValueLow?: number,
  startValueHigh?: number, step?: number
}

export {
  ModelEventName,
  ModelOptions,
};
