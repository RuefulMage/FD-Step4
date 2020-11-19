interface IRangeModeBehavior {

  updateView(runnersPositions: number[], tipsValues: number[],
             scalePositions: Map<number, number>, isRangeMode: boolean): void;

  updateTipsPositionAndText(runnersPositions: number[], tipsValues: number[]): void;
}

export default IRangeModeBehavior;
