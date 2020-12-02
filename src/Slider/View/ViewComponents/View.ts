import Orientation from '../../Utils/Orientation';
import CONSTANTS from '../../Utils/Constants';

import ViewComponent from './ViewComponent';
import Strip from './Strip';
import Runner from './Runner';
import Scale from './Scale';
import Range from './Range';
import Tip from './Tip';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';


class View extends ViewComponent {
  private strip: Strip;

  private range: Range;

  private scale: Scale;

  private orientation: Orientation;

  private runnersAndTips: Map<number, { runner: Runner, tip: Tip }>;

  private isTipsHidden: boolean;

  constructor(parentNode: HTMLElement, options: {
    orientation?: Orientation, isRange?: boolean, isTipsHidden?: boolean
  }) {
    super(parentNode, CONSTANTS.viewWrapperClassName);

    this.init(options);
  }

  private init(options: {
    orientation?: Orientation, isRange?: boolean, isTipsHidden?: boolean
  }): void {
    const {
      orientation = Orientation.HORIZONTAL, isRange = false, isTipsHidden = true,
    } = options;

    this.orientation = orientation;
    OrientationBehavior.orientation = orientation;
    this.DOMNode.classList.add(CONSTANTS.orientationClassNames.get(orientation));

    this.strip = new Strip(this.DOMNode);
    this.isTipsHidden = isTipsHidden;

    if (isRange) {
      const lowValueRunner = new Runner(this.strip.getDOMNode());
      const lowValueTip = new Tip(this.strip.getDOMNode(), isTipsHidden);

      const highValueRunner = new Runner(this.strip.getDOMNode());
      const highValueTip = new Tip(this.strip.getDOMNode(), isTipsHidden);

      this.runnersAndTips = new Map([
        [0, { runner: lowValueRunner, tip: lowValueTip }],
        [1, { runner: highValueRunner, tip: highValueTip }]]);
    } else {
      const lowValueRunner = new Runner(this.strip.getDOMNode());
      const lowValueTip = new Tip(this.strip.getDOMNode(), isTipsHidden);

      this.runnersAndTips = new Map([[0, { runner: lowValueRunner, tip: lowValueTip }]]);
    }

    this.range = new Range(this.strip.getDOMNode());
    this.addHandlers();
  }

  public hideTips(): void {
    this.isTipsHidden = true;
    this.runnersAndTips.forEach(((item) => item.tip.hide()));
  }

  public showTips(): void {
    this.isTipsHidden = false;
    this.runnersAndTips.forEach((item, index: 0 | 1) => this.showTip(index));

    if (this.runnersAndTips.size === 2) {
      const isRunnersTooClose = Math.abs(this.getRunnerPosition(0)
        - this.getRunnerPosition(1)) <= CONSTANTS.tipsJoinDistance;

      if (isRunnersTooClose) {
        this.hideTip(1);
        const tipPosition = this.getRunnerPosition(0)
          + ((this.getRunnerPosition(1) - this.getRunnerPosition(0)) / 2);
        this.runnersAndTips.get(0).tip.setPosition(tipPosition);
      }
    }
  }

  public getHideStatus(): boolean {
    return this.isTipsHidden;
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public setOrientation(orientation: Orientation): void {
    this.DOMNode.classList.remove(<string>CONSTANTS.orientationClassNames.get(this.orientation));
    this.DOMNode.classList.add(<string>CONSTANTS.orientationClassNames.get(orientation));

    OrientationBehavior.orientation = orientation;
    this.orientation = orientation;

    this.runnersAndTips.forEach((item) => {
      OrientationBehavior.resetStyles(item.tip.getDOMNode());
      OrientationBehavior.resetStyles(item.runner.getDOMNode());
    });
    OrientationBehavior.resetStyles(this.range.getDOMNode());

    if (this.scale !== undefined) {
      this.scale.reCreateScale();
    }

    this.notify('orientation-change', {});
  }

  // По размерам слайдера, вычисляет кол-во отрезков шкалы
  public computeDivisionsAmountBySize(): number {
    let sliderSize;
    if (this.orientation === Orientation.HORIZONTAL) {
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

  // обновляет Вью
  public updateView(runnersPositions: number[], tipsValues: number[],
                    scalePositions: Map<number, number>, isRange: boolean): void {
    if (isRange) {
      this.updateViewForInterval(runnersPositions, tipsValues,
        scalePositions);
    } else {
      this.updateViewForSingleRunner(runnersPositions, tipsValues,
        scalePositions);
    }
  }

  private hideTip(tipIndex: 0 | 1): void {
    this.runnersAndTips.get(tipIndex).tip.hide();
  }

  private showTip(tipIndex: 0 | 1): void {
    this.isTipsHidden = false;
    const { tip } = this.runnersAndTips.get(tipIndex);
    tip.show();
    tip.setPosition(this.getRunnerPosition(tipIndex));
  }

  // Ф-ии работы с режимом слайдера(промежуток или один бегунок)
  private setRange(minEdge: number, maxEdge: number): void {
    this.range.setLowEdge(minEdge);
    this.range.setHighEdge(maxEdge);
  }

  private changeModeToRange(highRunnerPosition: number, highValue: number): void {
    if (this.runnersAndTips.size === 2) {
      return;
    }

    const runner = new Runner(this.strip.getDOMNode());
    runner.setPosition(highRunnerPosition);

    const tip = new Tip(this.strip.getDOMNode());
    tip.setInnerText(highValue.toString());
    tip.setPosition(highRunnerPosition);

    this.runnersAndTips.set(1, { runner, tip });
    this.setRange(this.runnersAndTips.get(0).runner.getPosition(),
      this.runnersAndTips.get(1).runner.getPosition());
  }

  private changeModeToSingle(): void {
    if (this.runnersAndTips.size === 1) {
      return;
    }

    const { runner } = this.runnersAndTips.get(1);
    const { tip } = this.runnersAndTips.get(1);

    this.runnersAndTips.delete(1);
    runner.destroy();
    tip.destroy();

    this.setRange(0, this.runnersAndTips.get(0).runner.getPosition());
  }

  private setScale(valuesAndPositions: Map<number, number>): void {
    if (this.scale === undefined) {
      const orientation = this.orientation;
      this.scale = new Scale(this.getDOMNode(), valuesAndPositions);
    } else {
      this.scale.setScale(valuesAndPositions);
    }
  }


  private getRunnersAmount(): number {
    return this.runnersAndTips.size;
  }

  private setRunnerPosition(runnerIndex: 0 | 1, position: number): void {
    this.runnersAndTips.get(runnerIndex).runner.setPosition(position);
  }

  private getRunnerPosition(runnerIndex: 0 | 1): number {
    return this.runnersAndTips.get(runnerIndex).runner.getPosition();
  }

  // Ф-ии изменения и чтения св-в подсказок
  private setTipPosition(tipIndex: 0 | 1, position: number): void {
    const { tip } = this.runnersAndTips.get(tipIndex);
    tip.setPosition(position);
  }

  private setTipText(tipIndex: 0 | 1, text: string): void {
    const { tip } = this.runnersAndTips.get(tipIndex);
    tip.setInnerText(text);
  }


  private addHandlers(): void {
    this.DOMNode.addEventListener('slider-drag', this.handleRunnerDrag);
    this.DOMNode.addEventListener('slider-click', this.handleSliderClick);
    window.addEventListener('resize', this.handleResize);
  }

  // Ставит входящий бегунок поверх остальных
  private setRunnerToCurrent = (runner: Runner): void => {
    this.runnersAndTips.forEach((item) => {
      if (item.runner === runner) {
        item.runner.setCurrentStatus(true);
      } else {
        item.runner.setCurrentStatus(false);
      }
    });
  };

  // Оповещает подписчиков и передает им индекс бегунка, на котором произошло событие
  // и полученную позицию
  private handleRunnerDrag = (event: CustomEvent) => {
    let runnerIndex: number = 0;
    let dragTarget = event.detail.target;
    let lowRunner = this.runnersAndTips.get(0).runner;
    runnerIndex = lowRunner === dragTarget ? 0 : 1;

    this.setRunnerToCurrent(event.detail.target);
    this.notify('position-change-by-drag',
      { runnerIndex, position: event.detail.position });
  };

  // Получает позицию клика, вычисляет ближайший к позиции бегунок,
  // оповещает подписчиков и передает им полученную позицию и индекс бегунка
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

  // Оповещает подписщиков об изменении размеров окна
  // и передает им высчитанное кол-во делений шкалы
  private handleResize = (): void => {
    const scaleDivisionsAmount = this.computeDivisionsAmountBySize();
    this.notify('resize', { scaleDivisionsAmount });
  };


  private updateViewForInterval(runnersPositions: number[], tipsValues: number[],
                                scalePositions: Map<number, number>): void {
    if (this.getRunnersAmount() === 1) {
      this.changeModeToRange(runnersPositions[1], tipsValues[1]);
    }
    this.setScale(scalePositions);
    this.setRunnerPosition(0, runnersPositions[0]);
    this.setRunnerPosition(1, runnersPositions[1]);
    this.updateAllTipsPositionAndText(runnersPositions, tipsValues);
    this.setRange(runnersPositions[0], runnersPositions[1]);
  }

  private updateAllTipsPositionAndText(runnersPositions: number[], tipsValues: number[]) {
    const isRunnersTooClose = Math.abs(runnersPositions[0]
      - runnersPositions[1]) <= CONSTANTS.tipsJoinDistance;

    if (isRunnersTooClose) {
      this.joinTips(tipsValues, runnersPositions);
    } else {
      if (!this.getHideStatus()) {
        this.showTips();
      }

      this.setTipText(0, tipsValues[0].toString());
      this.setTipPosition(0, runnersPositions[0]);

      this.setTipText(1, tipsValues[1].toString());
      this.setTipPosition(1, runnersPositions[1]);
    }
  }

  private updateViewForSingleRunner(runnersPositions: number[], tipsValues: number[],
                                    scalePositions: Map<number, number>): void {
    if (this.getRunnersAmount() === 2) {
      this.changeModeToSingle();
    }
    this.setScale(scalePositions);
    this.setRunnerPosition(0, runnersPositions[0]);
    this.setTipText(0, tipsValues[0].toString());
    this.setTipPosition(0, runnersPositions[0]);
    this.setRange(0, runnersPositions[0]);
  }

  // Объединяет две подсказки в одну
  private joinTips(tipsValues: number[], tipsPositions: number[]): void {
    this.hideTip(1);
    const tipText = `${tipsValues[0]}&nbsp;&mdash;&nbsp;${tipsValues[1]}`;
    this.setTipText(0, tipText);
    const tipPosition: number = tipsPositions[0]
      + (tipsPositions[1] - tipsPositions[0]) / 2;
    this.setTipPosition(0, tipPosition);
  }
}

export default View;