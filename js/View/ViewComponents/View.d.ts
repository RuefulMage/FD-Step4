import ViewComponent from './ViewComponent';
import Strip from './Strip';
import Runner from './Runner';
import Scale from './Scale';
import Range from './Range';
import Tip from './Tip';
import IPublisher from '../../Observer/IPublisher';
import IObserver from '../../Observer/IObserver';
import Orientation from '../../Utils/Orientation';
import ViewOptions from '../../Utils/ViewOptions';
export default class View extends ViewComponent implements IPublisher {
    protected strip: Strip;
    protected range: Range;
    protected scale: Scale;
    protected orientation: Orientation;
    protected runnersAndTips: Map<Runner, Tip>;
    protected isTipsHidden: boolean;
    protected observers: Set<IObserver>;
    constructor(parentNode: HTMLElement, options: ViewOptions);
    protected init(options: ViewOptions): void;
    getRunnersAmount(): number;
    setRunnerPosition(runnerIndex: number, position: number): void;
    getRunnerPosition(index: number): number;
    setRange(minEdge: number, maxEdge: number): void;
    changeModeToRange(highRunnerPosition: number, highRunnerValue: number): void;
    changeModeToSingle(): void;
    setRunnerTipText(runnerIndex: number, text: string): void;
    hideTips(): void;
    showTips(): void;
    getHideStatus(): boolean;
    protected addHadler(): void;
    protected getRunners(): Runner[];
    getOrientation(): Orientation;
    setOrientation(orientation: Orientation): void;
    setScaleDivisionsAmount(divisionsAmount: number): void;
    setScale(minValue: number, maxValue: number): void;
    reCreateScale(): void;
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(eventType: string, data?: any): void;
}