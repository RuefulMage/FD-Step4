import IRangeModeBehavior from './IRangeModeBehavior';
import View from '../ViewComponents/View';

class SingleModeBehavior implements IRangeModeBehavior{
  protected view: View;

  constructor(view: View) {
    this.view = view;
  }

  public updateView(runnersPositions: number[], tipsValues: number[],
             scalePositions: Map<number, number>, isRange: boolean): void {
    if(isRange){
      this.view.changeModeToRange(runnersPositions[1], tipsValues[1]);
      this.view.setRangeMode(isRange);
      this.view.updateView(runnersPositions,tipsValues,scalePositions,isRange);
      return;
    }
    this.view.setScale(scalePositions);
    this.view.setRunnerPosition(0, runnersPositions[0]);
    this.updateTipsPositionAndText(runnersPositions, tipsValues);
    this.view.setRange(0, runnersPositions[0]);
  }


  updateTipsPositionAndText(runnersPositions: number[], tipsValues: number[]): void {
    this.view.setTipText(0, tipsValues[0].toString());
    this.view.setTipPosition(0, runnersPositions[0]);
  }
}

export default SingleModeBehavior;