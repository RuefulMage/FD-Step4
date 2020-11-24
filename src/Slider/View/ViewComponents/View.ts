import IPublisher from '../../Observer/IPublisher';
import IObserver from '../../Observer/IObserver';
import Orientation from '../../Utils/Orientation';
import CONSTANTS from '../../Utils/Constants';
import OrientationBehaviorBuilder from '../OrientationBehaviors/OrientationBehaviorBuilder';

import ViewComponent from './ViewComponent';
import Strip from './Strip';
import Runner from './Runner';
import Scale from './Scale';
import Range from './Range';
import Tip from './Tip';

class View extends ViewComponent implements IPublisher {
  protected strip: Strip;

  protected range: Range;

  protected scale: Scale;

  protected orientation: Orientation;

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
      const lowValueRunner = new Runner(this.strip.getDOMNode(), orientationBehavior);
      const lowValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, isTipsHidden);

      const highValueRunner = new Runner(this.strip.getDOMNode(), orientationBehavior);
      const highValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, isTipsHidden);

      this.runnersAndTips = new Map([
        [0, { runner: lowValueRunner, tip: lowValueTip }],
        [1, { runner: highValueRunner, tip: highValueTip }]]);
    } else {
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
    this.runnersAndTips.forEach((item, index) => this.showTip(index));

    if (this.runnersAndTips.size > 1) {
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

  public showTip(tipIndex: number): void {
    this.isTipsHidden = false;
    const { tip } = this.runnersAndTips.get(tipIndex);
    tip.show();
    tip.setPosition(this.getRunnerPosition(tipIndex));
  }

  public getHideStatus(): boolean {
    return this.isTipsHidden;
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

    // Ставит входящий бегунок поверх остальных
    function setRunnerToCurrent(runner: Runner): void {
      that.runnersAndTips.forEach((item, index) => {
        if (item.runner === runner) {
          item.runner.setCurrentStatus(true);
        } else {
          item.runner.setCurrentStatus(false);
        }
      });
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
          }
        });
        setRunnerToCurrent(event.detail.target);
        that.notify('position-change-by-drag',
          { runnerIndex, position: event.detail.position });
      }
    }

    // Получает позицию клика, вычисляет ближайший к позиции бегунок,
    // оповещает подписчиков и передает им полученную позицию и индекс бегунка
    function handleSliderClick(event: Event): void {
      if (!isCustomEvent(event)) {
        throw new Error('not a custom event');
      } else {
        let runnerIndex: number = 0;
        let minPosDifference = Number.MAX_VALUE;
        that.runnersAndTips.forEach((item, index) => {
          const difference = Math.abs(item.runner.getPosition() - event.detail.position);
          if (difference < minPosDifference) {
            runnerIndex = index;
            minPosDifference = difference;
          }
        });
        setRunnerToCurrent(that.runnersAndTips.get(runnerIndex).runner);
        that.notify('position-change-by-click',
          { position: event.detail.position, runnerIndex });
      }
    }

    // Оповещает подписщиков об изменении размеров окна
    // и передает им высчитанное кол-во делений шкалы
    function handleResize(): void {
      const scaleDivisionsAmount = that.computeDivisionsAmountBySize();
      that.notify('resize', { scaleDivisionsAmount });
    }

    this.DOMNode.addEventListener('slider-drag', handleRunnerDrag);
    this.DOMNode.addEventListener('slider-click', handleSliderClick);
    window.addEventListener('resize', handleResize);
  }

  // Обновляет Вью, когда бегунков два
  protected updateViewForInterval(runnersPositions: number[], tipsValues: number[],
    scalePositions: Map<number, number>): void {
    if (this.getRunnersAmount() < 2) {
      this.changeModeToRange(runnersPositions[1], tipsValues[1]);
    }
    this.setScale(scalePositions);
    this.setRunnerPosition(0, runnersPositions[0]);
    this.setRunnerPosition(1, runnersPositions[1]);
    this.updateAllTipsPositionAndText(runnersPositions, tipsValues);
    this.setRange(runnersPositions[0], runnersPositions[1]);
  }

  // Обновляет Бегунки и подсказки, когда интервал
  protected updateAllTipsPositionAndText(runnersPositions: number[], tipsValues: number[]) {
    if (this.getRunnersAmount() < 2) {
      throw new Error('Runners amount is too small');
    }
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

  // Обновляет Вью, когда только один бегунок
  protected updateViewForSingleRunner(runnersPositions: number[], tipsValues: number[],
    scalePositions: Map<number, number>): void {
    if (this.getRunnersAmount() > 1) {
      this.changeModeToSingle();
    }
    this.setScale(scalePositions);
    this.setRunnerPosition(0, runnersPositions[0]);
    this.setTipText(0, tipsValues[0].toString());
    this.setTipPosition(0, runnersPositions[0]);
    this.setRange(0, runnersPositions[0]);
  }

  // Объединяет две подсказки в одну
  protected joinTips(tipsValues: number[], tipsPositions: number[]): void {
    this.hideTip(1);
    const tipText = `${tipsValues[0]}&nbsp;&mdash;&nbsp;${tipsValues[1]}`;
    this.setTipText(0, tipText);
    const tipPosition: number = tipsPositions[0]
      + (tipsPositions[1] - tipsPositions[0]) / 2;
    this.setTipPosition(0, tipPosition);
  }
}

export default View;
