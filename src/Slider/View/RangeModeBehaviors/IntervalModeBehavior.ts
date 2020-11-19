import IRangeModeBehavior from './IRangeModeBehavior';
import View from '../ViewComponents/View';
import CONSTANTS from '../../Utils/Constants';

class IntervalModeBehavior implements IRangeModeBehavior{
  protected view: View;

  constructor(view: View) {
    this.view = view;
  }


  updateView(runnersPositions: number[], tipsValues: number[],
             scalePositions: Map<number, number>, isRange: boolean): void {
    if(!isRange){
      this.view.changeModeToSingle();
      this.view.setRangeMode(isRange);
      this.view.updateView(runnersPositions, tipsValues,
        scalePositions, isRange);
      return;
    }
    this.view.setScale(scalePositions);
    this.updateRunnersPosition(runnersPositions);
    this.updateTipsPositionAndText(runnersPositions, tipsValues);
    this.view.setRange(runnersPositions[0], runnersPositions[1]);
  }


  public updateRunnersPosition(runnersPositions: number[]): void {
    this.view.setRunnerPosition(0, runnersPositions[0]);
    this.view.setRunnerPosition(1, runnersPositions[1]);
  }

  public updateTipsPositionAndText(runnersPositions: number[], tipsValues: number[]): void {
    const isRunnersTooClose = Math.abs(runnersPositions[0]
      - runnersPositions[1]) <= CONSTANTS.tipsJoinDistance;

    if (isRunnersTooClose) {
      this.joinTips(tipsValues, runnersPositions);
    } else {
      if (!this.view.getHideStatus()) {
        this.view.showTips();
      }

      this.view.setTipText(0, tipsValues[0].toString());
      this.view.setTipPosition(0, runnersPositions[0]);

      this.view.setTipText(1, tipsValues[1].toString());
      this.view.setTipPosition(1, runnersPositions[1]);
    }
  }


  // Объединяет две подсказки в одну
  protected joinTips(tipsValues: number[], tipsPositions: number[]): void {
    this.view.hideTip(1);
    const tipText = `${tipsValues[0]}&nbsp;&mdash;&nbsp;${tipsValues[1]}`;
    this.view.setTipText(0, tipText);
    const tipPosition: number = tipsPositions[0]
      + (tipsPositions[1] - tipsPositions[0]) / 2;
    this.view.setTipPosition(0, tipPosition);
  }
}

export default IntervalModeBehavior;