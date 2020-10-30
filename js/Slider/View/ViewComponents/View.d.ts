import IPublisher from '../../Observer/IPublisher';
import IObserver from '../../Observer/IObserver';
import Orientation from '../../Utils/Orientation';
import ViewComponent from './ViewComponent';
import Strip from './Strip';
import Runner from './Runner';
import Scale from './Scale';
import Range from './Range';
import Tip from './Tip';
declare class View extends ViewComponent implements IPublisher {
    protected strip: Strip;
    protected range: Range;
    protected scale: Scale;
    protected orientation: Orientation;
    protected runnersAndTips: Map<number, {
        runner: Runner;
        tip: Tip;
    }>;
    protected isTipsHidden: boolean;
    protected observers: Set<IObserver>;
    constructor(parentNode: HTMLElement, options: {
        orientation?: Orientation;
        isRange?: boolean;
        isTipsHidden?: boolean;
    });
    protected init(options: {
        orientation?: Orientation;
        isRange?: boolean;
        isTipsHidden?: boolean;
    }): void;
    getRunnersAmount(): number;
    setRunnerPosition(runnerIndex: number, position: number): void;
    getRunnerPosition(runnerIndex: number): number;
    setTipPosition(tipIndex: number, position: number): void;
    setTipText(tipIndex: number, text: string): void;
    hideTips(): void;
    hideTip(tipIndex: number): void;
    showTips(): void;
    showTip(tipIndex: number): void;
    getHideStatus(): boolean;
    setRange(minEdge: number, maxEdge: number): void;
    changeModeToRange(highRunnerPosition: number, highValue: number): void;
    changeModeToSingle(): void;
    getOrientation(): Orientation;
    setOrientation(orientation: Orientation): void;
    setScale(valuesAndPositions: Map<number, number>): void;
    reCreateScale(): void;
    getDivisionsAmount(): number;
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(eventType: string, data?: any): void;
    protected addHandlers(): void;
}
export default View;
