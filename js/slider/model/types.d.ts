declare type ModelEventName = 'edge-value-change' | 'value-change' | 'range-mode-change' | 'step-change';
interface ModelOptions {
    isRange?: boolean;
    minValue?: number;
    maxValue?: number;
    lowValue?: number;
    highValue?: number;
    step?: number;
}
export { ModelEventName, ModelOptions, };
