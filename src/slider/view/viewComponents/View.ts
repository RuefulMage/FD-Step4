import { Orientation, DefaultSliderOptions } from '../../utils/types';
import Constants from '../../utils/constants';
import { UpdateViewOptions, PositionOptions, ViewOptions } from '../types';

import ViewComponent from './ViewComponent';
import Strip from './Strip';
import Runner from './Runner';
import Scale from './Scale';
import Range from './Range';
import Tip from './Tip';
import OrientationBehavior from '../orientationBehaviors/OrientationBehavior';

class View extends ViewComponent {
  private strip: Strip;

  private range: Range;

  private scale: Scale;

  private orientation: Orientation;

  private orientationBehavior: OrientationBehavior;

  private runnersAndTips: Map<number, { runner: Runner, tip: Tip }>;

  private isTipsExists: boolean;

  constructor(parentNode: HTMLElement, options: ViewOptions) {
    super(parentNode, Constants.viewWrapperClassName);
    this.init(options);
  }

  public deleteTips(): void {
    this.isTipsExists = false;
    this.runnersAndTips.forEach(((_, index: 0 | 1) => {
      this.deleteTip(index);
    }));
  }

  public createTips(): void {
    this.isTipsExists = true;
    this.createTip(0);
    if (this.runnersAndTips.size === 2) {
      const isRunnersTooClose = Math.abs(this.getRunnerPosition(0)
        - this.getRunnerPosition(1)) <= Constants.tipsJoinDistance;
      if (isRunnersTooClose) {
        const tipPosition = this.getRunnerPosition(0)
          + ((this.getRunnerPosition(1) - this.getRunnerPosition(0)) / 2);
        this.runnersAndTips.get(0).tip.setPosition(tipPosition);
      } else {
        this.createTip(1);
      }
    }
  }

  public getTipsExistStatus(): boolean {
    return this.isTipsExists;
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public setOrientation(orientation: Orientation): void {
    this.DOMNode.classList.remove(<string>Constants.orientationClassNames.get(this.orientation));
    this.DOMNode.classList.add(<string>Constants.orientationClassNames.get(orientation));
    this.orientationBehavior.setOrientation(orientation);
    this.orientation = orientation;
    this.runnersAndTips.forEach((item) => {
      if (item.tip !== null) {
        this.orientationBehavior.resetStyles(item.tip.getDOMNode());
      }
      this.orientationBehavior.resetStyles(item.runner.getDOMNode());
    });
    this.orientationBehavior.resetStyles(this.range.getDOMNode());
    if (this.scale !== undefined) {
      this.scale.reCreateScale();
    }
    this.notify('orientation-change', {});
  }

  // По размерам слайдера, вычисляет кол-во отрезков шкалы
  public computeDivisionsAmountBySize(): number {
    let sliderSize;
    if (this.orientation === 'horizontal') {
      sliderSize = this.getDOMNode().clientWidth;
    } else {
      sliderSize = this.getDOMNode().clientHeight;
    }
    const scaleDivisionsAmount = Math.ceil(sliderSize / 300) * 2;
    if (scaleDivisionsAmount > 2) {
      return scaleDivisionsAmount;
    }
    return 3;
  }

  public updateView({
    runnersPositions, tipsValues, scalePositions, isRange,
  }: UpdateViewOptions): void {
    if (isRange) {
      this.updateViewForInterval({
        runnersPositions,
        tipsValues,
        scalePositions,
      });
    } else {
      this.updateViewForSingleRunner({
        runnersPositions,
        tipsValues,
        scalePositions,
      });
    }
  }

  private init({
    orientation = DefaultSliderOptions.orientation,
    isRange = DefaultSliderOptions.isRange,
    isTipsExists = DefaultSliderOptions.isTipsExists,
  }: ViewOptions): void {
    this.orientation = orientation;
    this.orientationBehavior = new OrientationBehavior(orientation);
    this.DOMNode.classList.add(Constants.orientationClassNames.get(orientation));
    this.strip = new Strip(
      { parentNode: this.DOMNode, orientationBehavior: this.orientationBehavior },
    );
    this.isTipsExists = isTipsExists;
    const lowValueRunner = new Runner({
      parentNode: this.strip.getDOMNode(),
      orientationBehavior: this.orientationBehavior,
    });
    this.runnersAndTips = new Map([[0, { runner: lowValueRunner, tip: null }]]);
    if (isRange) {
      const highValueRunner = new Runner({
        parentNode: this.strip.getDOMNode(),
        orientationBehavior: this.orientationBehavior,
      });
      this.runnersAndTips.set(1, { runner: highValueRunner, tip: null });
    }
    if (isTipsExists) {
      this.runnersAndTips.forEach((_, index: 0 | 1) => this.createTip(index));
    }
    this.range = new Range({
      parentNode: this.strip.getDOMNode(),
      orientationBehavior: this.orientationBehavior,
    });
    this.addHandlers();
  }

  private deleteTip(tipIndex: 0 | 1): void {
    const { runner, tip } = this.runnersAndTips.get(tipIndex);
    if (tip !== null) {
      tip.destroy();
      this.runnersAndTips.set(tipIndex, { runner, tip: null });
    }
  }

  private createTip(tipIndex: 0 | 1): Tip {
    const { runner, tip } = this.runnersAndTips.get(tipIndex);
    if (tip !== null) {
      tip.setPosition(this.getRunnerPosition(tipIndex));
      return tip;
    }
    const newTip = new Tip(
      { parentNode: this.strip.getDOMNode(), orientationBehavior: this.orientationBehavior },
    );
    newTip.setPosition(this.getRunnerPosition(tipIndex));
    this.runnersAndTips.set(tipIndex, { runner, tip: newTip });
    this.notify('tips-hide-status-change', {});
    return newTip;
  }

  private setRange(minEdge: number, maxEdge: number): void {
    this.range.setLowEdge(minEdge);
    this.range.setHighEdge(maxEdge);
  }

  private changeModeToRange(highRunnerPosition: number, highValue: number): void {
    if (this.runnersAndTips.size === 2) {
      return;
    }
    const runner = new Runner({
      parentNode: this.strip.getDOMNode(),
      orientationBehavior: this.orientationBehavior,
    });
    runner.setPosition(highRunnerPosition);
    this.runnersAndTips.set(1, { runner, tip: null });
    if (this.isTipsExists) {
      const tip = this.createTip(1);
      tip.setInnerText(highValue.toString());
    }
    this.setRange(this.runnersAndTips.get(0).runner.getPosition(),
      this.runnersAndTips.get(1).runner.getPosition());
  }

  private changeModeToSingle(): void {
    if (this.runnersAndTips.size === 1) {
      return;
    }
    const { runner } = this.runnersAndTips.get(1);
    this.deleteTip(1);
    runner.destroy();
    this.runnersAndTips.delete(1);
    this.setRange(0, this.runnersAndTips.get(0).runner.getPosition());
  }

  private setScale(valuesAndPositions: Map<number, number>): void {
    if (this.scale === undefined) {
      this.scale = new Scale({
        parentNode: this.getDOMNode(),
        orientationBehavior: this.orientationBehavior,
      }, valuesAndPositions);
    } else {
      this.scale.setScale(valuesAndPositions);
    }
  }

  private getRunnersAmount(): number {
    return this.runnersAndTips.size;
  }

  private setRunnerPosition({ index, position }: PositionOptions): void {
    this.runnersAndTips.get(index).runner.setPosition(position);
  }

  private getRunnerPosition(runnerIndex: 0 | 1): number {
    return this.runnersAndTips.get(runnerIndex).runner.getPosition();
  }

  private setTipPosition({ index, position }: PositionOptions): void {
    const { tip } = this.runnersAndTips.get(index);
    if (tip !== null) {
      tip.setPosition(position);
    }
  }

  private setTipText(tipIndex: 0 | 1, text: string): void {
    const { tip } = this.runnersAndTips.get(tipIndex);
    if (tip !== null) {
      tip.setInnerText(text);
    }
  }

  private addHandlers(): void {
    this.DOMNode.addEventListener('slider-drag', this.handleRunnerDrag);
    this.DOMNode.addEventListener('slider-click', this.handleSliderClick);
    window.addEventListener('resize', this.handleResize);
  }

  private setRunnerToCurrent = (runner: Runner): void => {
    this.runnersAndTips.forEach((item) => {
      if (item.runner === runner) {
        item.runner.setCurrentStatus(true);
      } else {
        item.runner.setCurrentStatus(false);
      }
    });
  };

  private handleRunnerDrag = (event: CustomEvent) => {
    let runnerIndex: number = 0;
    const dragTarget = event.detail.target;
    const lowRunner = this.runnersAndTips.get(0).runner.getDOMNode();
    runnerIndex = lowRunner === dragTarget ? 0 : 1;
    this.setRunnerToCurrent(this.runnersAndTips.get(runnerIndex).runner);
    this.notify('position-change-by-drag',
      { runnerIndex, position: event.detail.position });
  };

  private handleSliderClick = (event: CustomEvent): void => {
    let runnerIndex: number = 0;
    let minPosDifference = Number.MAX_VALUE;
    this.runnersAndTips.forEach((item, index) => {
      const difference = Math.abs(item.runner.getPosition() - event.detail.position);
      if (difference < minPosDifference) {
        runnerIndex = index;
        minPosDifference = difference;
      }
    });
    this.setRunnerToCurrent(this.runnersAndTips.get(runnerIndex).runner);
    this.notify('position-change-by-click',
      { position: event.detail.position, runnerIndex });
  };

  private handleResize = (): void => {
    const scaleDivisionsAmount = this.computeDivisionsAmountBySize();
    this.notify('resize', { scaleDivisionsAmount });
  };

  private updateViewForInterval(
    { runnersPositions, tipsValues, scalePositions }: UpdateViewOptions,
  ): void {
    if (this.getRunnersAmount() === 1) {
      this.changeModeToRange(runnersPositions[1], tipsValues[1]);
    }
    this.setScale(scalePositions);
    this.setRunnerPosition({ index: 0, position: runnersPositions[0] });
    this.setRunnerPosition({ index: 1, position: runnersPositions[1] });
    this.updateAllTipsPositionAndText({ runnersPositions, tipsValues });
    this.setRange(runnersPositions[0], runnersPositions[1]);
  }

  private updateAllTipsPositionAndText({ runnersPositions, tipsValues }: UpdateViewOptions) {
    if (!this.isTipsExists) {
      return;
    }
    const isRunnersTooClose = Math.abs(runnersPositions[0]
      - runnersPositions[1]) <= Constants.tipsJoinDistance;
    if (isRunnersTooClose) {
      this.joinTips(tipsValues, runnersPositions);
    } else {
      this.createTips();
      this.setTipText(0, tipsValues[0].toString());
      this.setTipPosition({ index: 0, position: runnersPositions[0] });
      this.setTipText(1, tipsValues[1].toString());
      this.setTipPosition({ index: 1, position: runnersPositions[1] });
    }
  }

  private updateViewForSingleRunner(
    { runnersPositions, tipsValues, scalePositions }: UpdateViewOptions,
  ): void {
    if (this.getRunnersAmount() === 2) {
      this.changeModeToSingle();
    }
    this.setScale(scalePositions);
    this.setRunnerPosition({ index: 0, position: runnersPositions[0] });
    if (this.isTipsExists) {
      this.setTipText(0, tipsValues[0].toString());
      this.setTipPosition({ index: 0, position: runnersPositions[0] });
    }
    this.setRange(0, runnersPositions[0]);
  }

  private joinTips(tipsValues: number[], tipsPositions: number[]): void {
    this.deleteTip(1);
    const tipText = `${tipsValues[0]}&nbsp;&mdash;&nbsp;${tipsValues[1]}`;
    this.setTipText(0, tipText);
    const tipPosition: number = tipsPositions[0]
      + (tipsPositions[1] - tipsPositions[0]) / 2;
    this.setTipPosition({ index: 0, position: tipPosition });
  }
}

export default View;
