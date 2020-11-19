import IPublisher from '../../Observer/IPublisher';
import IObserver from '../../Observer/IObserver';
import Orientation from '../../Utils/Orientation';
import CONSTANTS from '../../Utils/Constants';
import OrientationBehaviorBuilder from '../OrientationBehaviors/OrientationBehaviorBuilder';

import IRangeModeBehavior from '../RangeModeBehaviors/IRangeModeBehavior';

import ViewComponent from './ViewComponent';
import Strip from './Strip';
import Runner from './Runner';
import Scale from './Scale';
import Range from './Range';
import Tip from './Tip';
import IntervalModeBehavior from '../RangeModeBehaviors/IntervalModeBehavior';
import SingleModeBehavior from '../RangeModeBehaviors/SingleModeBehavior';

class View extends ViewComponent implements IPublisher {
  protected strip: Strip;

  protected range: Range;

  protected scale: Scale;

  protected orientation: Orientation;

  protected rangeModeBehavior: IRangeModeBehavior;

  protected runnersAndTips: Map<number, { runner: Runner, tip: Tip }>;

  protected isTipsHidden: boolean;

  protected observers: Set<IObserver> = new Set<IObserver>();

  constructor(parentNode: HTMLElement, options: {
    orientation?: Orientation, isRange?: boolean, isTipsHidden?: boolean
  }) {
    super(parentNode, CONSTANTS.viewWrapperClassName);
    this.init(options);
  }

  protected init(options: {
    orientation?: Orientation, isRange?: boolean, isTipsHidden?: boolean
  }): void {
    const {
      orientation = Orientation.HORIZONTAL, isRange = false, isTipsHidden = true,
    } = options;

    this.orientation = orientation;
    this.DOMNode.classList.add(CONSTANTS.orientationClassNames.get(orientation));
    const orientationBehavior = OrientationBehaviorBuilder
      .getOrientationBehaviorByOrientation(orientation);

    this.strip = new Strip(this.DOMNode, orientationBehavior);
    this.isTipsHidden = isTipsHidden;

    if (isRange) {
      this.rangeModeBehavior = new IntervalModeBehavior(this);
      const lowValueRunner = new Runner(this.strip.getDOMNode(), orientationBehavior);
      const lowValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, isTipsHidden);

      const highValueRunner = new Runner(this.strip.getDOMNode(), orientationBehavior);
      const highValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, isTipsHidden);

      this.runnersAndTips = new Map([
        [0, { runner: lowValueRunner, tip: lowValueTip }],
        [1, { runner: highValueRunner, tip: highValueTip }]]);
    } else {
      this.rangeModeBehavior = new SingleModeBehavior(this);
      const lowValueRunner = new Runner(this.strip.getDOMNode(), orientationBehavior);
      const lowValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, isTipsHidden);

      this.runnersAndTips = new Map([[0, { runner: lowValueRunner, tip: lowValueTip }]]);
    }

    this.range = new Range(this.strip.getDOMNode(), orientationBehavior);
    this.addHandlers();
  }

  // Ф-ии чтения и изменения св-в бегунков

  public getRunnersAmount(): number {
    return this.runnersAndTips.size;
  }

  public setRunnerPosition(runnerIndex: number, position: number): void {
    const isRunnerExist = !(runnerIndex >= this.getRunnersAmount() || runnerIndex < 0);

    if (!isRunnerExist) {
      throw new Error(`runner with index: ${runnerIndex} does not exits`);
    }
    this.runnersAndTips.get(runnerIndex).runner.setPosition(position);
  }

  public getRunnerPosition(runnerIndex: number): number {
    const isRunnerExist = !(runnerIndex >= this.getRunnersAmount() || runnerIndex < 0);

    if (!isRunnerExist) {
      throw new Error(`runner with index: ${runnerIndex} does not exits`);
    }
    return this.runnersAndTips.get(runnerIndex).runner.getPosition();
  }

  // Ф-ии изменения и чтения св-в подсказок
  public setTipPosition(tipIndex: number, position: number): void {
    const isTipExist = !(tipIndex >= this.getRunnersAmount() || tipIndex < 0);

    if (!isTipExist) {
      throw new Error(`tip with index ${tipIndex} does not exits`);
    }
    const { tip } = this.runnersAndTips.get(tipIndex);
    tip.setPosition(position);
  }

  public setTipText(tipIndex: number, text: string): void {
    const { tip } = this.runnersAndTips.get(tipIndex);
    tip.setInnerText(text);
  }

  public hideTips(): void {
    this.isTipsHidden = true;
    this.runnersAndTips.forEach(((item) => item.tip.hide()));
  }

  public hideTip(tipIndex: number): void {
    this.runnersAndTips.get(tipIndex).tip.hide();
  }

  public showTips(): void {
    this.isTipsHidden = false;
    this.runnersAndTips.forEach((item,index) => this.showTip(index));

    if(this.runnersAndTips.size > 1){
      const isRunnersTooClose = Math.abs(this.getRunnerPosition(0)
        - this.getRunnerPosition(1)) <= CONSTANTS.tipsJoinDistance;

      if (isRunnersTooClose) {
        this.hideTip(1);
        let tipPosition = this.getRunnerPosition(0) +
          ((this.getRunnerPosition(1) - this.getRunnerPosition(0)) / 2);
        this.runnersAndTips.get(0).tip.setPosition(tipPosition);
      }
    }
  }

  public showTip(tipIndex: number): void {
    this.isTipsHidden = false;
    let tip = this.runnersAndTips.get(tipIndex).tip;
    tip.show();
    tip.setPosition(this.getRunnerPosition(tipIndex));
  }

  public getHideStatus(): boolean {
    return this.isTipsHidden;
  }

  public getTipsPositions(): number[] {
    if(this.isTipsHidden){
      throw new Error("Tips is hidden!");
    }
    let positions: number[] = [];
    this.runnersAndTips.forEach((item) => {
      positions.push(item.runner.getPosition());
    });
    return positions;
  }

  public getTipsValues(): number[] {
    if(this.isTipsHidden){
      throw new Error("Tips is hidden!");
    }
    let values: number[] = [];
    this.runnersAndTips.forEach((item, index) => {
      values.push(Number(item.tip.getDOMNode().innerText));
    });
    return values;
  }

  // Ф-ии работы с режимом слайдера(промежуток или один бегунок)
  public setRange(minEdge: number, maxEdge: number): void {
    this.range.setLowEdge(minEdge);
    this.range.setHighEdge(maxEdge);
  }

  public changeModeToRange(highRunnerPosition: number, highValue: number): void {
    if (this.runnersAndTips.size === 2) {
      return;
    }

    const orientationBehavior = OrientationBehaviorBuilder
      .getOrientationBehaviorByOrientation(this.orientation);

    const runner = new Runner(this.strip.getDOMNode(), orientationBehavior);
    runner.setPosition(highRunnerPosition);

    const tip = new Tip(this.strip.getDOMNode(), orientationBehavior, this.isTipsHidden);
    tip.setInnerText(highValue.toString());
    tip.setPosition(highRunnerPosition);

    this.runnersAndTips.set(1, { runner, tip });
    this.setRange(this.runnersAndTips.get(0).runner.getPosition(),
      this.runnersAndTips.get(1).runner.getPosition());
  }

  public changeModeToSingle(): void {
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

  // Ф-ии работы с ориентацией слайдера
  public getOrientation(): Orientation {
    return this.orientation;
  }

  public setOrientation(orientation: Orientation): void {
    this.DOMNode.classList.remove(<string>CONSTANTS.orientationClassNames.get(this.orientation));
    this.DOMNode.classList.add(<string>CONSTANTS.orientationClassNames.get(orientation));

    this.orientation = orientation;
    const orientationBehavior = OrientationBehaviorBuilder
      .getOrientationBehaviorByOrientation(orientation);

    this.runnersAndTips.forEach((item) => {
      item.tip.setOrientationBehavior(orientationBehavior);
      item.tip.setPosition(item.runner.getPosition());
      item.runner.setOrientationBehavior(orientationBehavior);
      item.runner.setPosition(item.runner.getPosition());
    });

    this.range.setOrientationBehavior(orientationBehavior);
    this.strip.setOrientationBehavior(orientationBehavior);
    if (this.scale !== undefined) {
      this.scale.setOrientationBehavior(orientationBehavior);
    }
  }

  // Ф-ии чтения и изменения св-в шкалы
  public setScale(valuesAndPositions: Map<number, number>): void {
    if (this.scale === undefined) {
      const orientationBehavior = OrientationBehaviorBuilder
        .getOrientationBehaviorByOrientation(this.orientation);
      this.scale = new Scale(this.getDOMNode(),
        { valuesAndPositions, orientationBehavior });
    } else {
      this.scale.setScale(valuesAndPositions);
    }
  }

  // Пересоздает шкалу со старыми делениями
  public reCreateScale(): void {
    if (this.scale !== undefined) {
      this.scale.reCreateScale();
    }
  }

  // По размерам слайдера, вычисляет кол-во делений шкалы
  public getDivisionsAmount(): number {
    let scaleDivisionsAmount;
    let sliderSize;
    if (this.orientation === Orientation.HORIZONTAL) {
      sliderSize = this.getDOMNode().clientWidth;
    } else {
      sliderSize = this.getDOMNode().clientHeight;
    }

    if (sliderSize > 1000) {
      scaleDivisionsAmount = 10;
    } else if (sliderSize > 800) {
      scaleDivisionsAmount = 8;
    } else if (sliderSize > 600) {
      scaleDivisionsAmount = 6;
    } else if (sliderSize > 400) {
      scaleDivisionsAmount = 4;
    } else {
      scaleDivisionsAmount = 2;
    }

    return scaleDivisionsAmount;
  }

  public updateView(runnersPositions: number[], tipsValues: number[],
                    scalePositions: Map<number, number>, isRange: boolean): void {
    this.rangeModeBehavior.updateView(runnersPositions, tipsValues, scalePositions, isRange);
  }

  public setRangeMode(isRange: boolean) {
    if(isRange) {
      this.rangeModeBehavior = new IntervalModeBehavior(this);
    } else {
      this.rangeModeBehavior = new SingleModeBehavior(this);
    }
  }

  // Ф-ии оповещателя
  public attach(observer: IObserver): void {
    this.observers.add(observer);
  }

  public detach(observer: IObserver): void {
    this.observers.delete(observer);
  }

  public notify(eventType: string, data?: any): void {
    if (data !== undefined) {
      this.observers.forEach((observer: IObserver) => observer.update(eventType, data));
    } else {
      this.observers.forEach((observer: IObserver) => observer.update(eventType));
    }
  }

  // Навешивает обработчики кастомных событий 'slider-drag' и 'slider-click' и события resize
  protected addHandlers(): void {
    const that: View = this;

    function isCustomEvent(event: Event): event is CustomEvent {
      return (event as CustomEvent).detail !== undefined;
    }

    // Оповещает подписчиков и передает им индекс бегунка, на котором произошло событие
    // и полученную позицию
    function handleRunnerDrag(event: Event) {
      if (!isCustomEvent(event)) {
        throw new Error('not a custom event');
      } else {
        let runnerIndex: number = 0;
        that.runnersAndTips.forEach((item, index) => {
          if (item.runner === event.detail.target) {
            runnerIndex = index;
            item.runner.setCurrentStatus(true);
          } else {
            item.runner.setCurrentStatus(false);
          }
        });
        that.notify('position-change-by-drag',
          { runnerIndex, position: event.detail.position });
      }
    }

    // Оповещает подписчиков и передает им полученную позицию
    function handleSliderClick(event: Event): void {
      if (!isCustomEvent(event)) {
        throw new Error('not a custom event');
      } else {

        let runnerIndex: number = 0;
        let minPosDifference = Number.MAX_VALUE;
        that.runnersAndTips.forEach((item, index) => {
          let difference = Math.abs(item.runner.getPosition() - event.detail.position);
          if (difference < minPosDifference) {
            runnerIndex = index;
            minPosDifference = difference;
          }
        });
        that.notify('position-change-by-click',
          { position: event.detail.position, runnerIndex: runnerIndex });
      }
    }

    // Оповещает подписщиков об изменении размеров окна
    // и передает им высчитанное кол-во делений шкалы
    function handleResize(): void {
      const scaleDivisionsAmount = that.getDivisionsAmount();
      that.notify('resize', { scaleDivisionsAmount });
    }

    this.DOMNode.addEventListener('slider-drag', handleRunnerDrag);
    this.DOMNode.addEventListener('slider-click', handleSliderClick);
    window.addEventListener('resize', handleResize);
  }
}

export default View;
