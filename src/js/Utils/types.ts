export enum Orientation{
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export type options = {
    orientation: Orientation,
    isRange: boolean,
    isTipsHidden: boolean,
    divisionsAmount: number,
    minValue: number,
    maxValue: number,
    startValueLow: number,
    startValueHigh: number,
    step: number
}

export type modelOptions = {
    isRange: boolean,
    minValue: number,
    maxValue: number,
    startValueLow: number,
    startValueHigh: number,
    step: number
}