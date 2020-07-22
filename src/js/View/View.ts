import { ViewComponent } from './ViewComponent';
import { Strip } from './Strip';
import { Runner } from './Runner';
import { Scale } from './Scale';
import { Range } from './Range';
import { constants } from '../Utils/Constants';
import { Orientation } from './Orientation';
import { Tip } from './Tip';
import { IPublisher } from './IPublisher';
import { IObserver } from './IObserver';
import { OrientaitionBehaviorBuilder } from './OrientaitionBehaviorBuilder';


export type options = {
        orientation: Orientation,
        isRange: boolean,
        isTipsHidden: boolean,
        divisionsAmount: number,
        minValue: number,
        maxValue: number,
        startPositionLow: number,
        startPositionHigh: number
        startValueLow: number,
        startValueHigh: number,
        step: number
    };

export class View extends ViewComponent implements IPublisher{
    // @ts-ignore
    protected _strip: Strip;
    // @ts-ignore
    protected _range: Range;
    // @ts-ignore
    protected _scale: Scale;
    // @ts-ignore
    protected _orientation: Orientation;
    // @ts-ignore
    protected _runnersAndTips: Map<Runner, Tip>;
    // @ts-ignore
    protected _isTipsHidden: boolean;
    protected _observers: Set<IObserver> = new Set<IObserver>();

    constructor(parentNode: JQuery<HTMLElement>, options: options) {
        super(parentNode, constants.viewWrapperClassName + ' ' + constants.orientationClassNames.get(options.orientation));
        this.init(options);
    }


    init(options: options) {
        let orientationBehavior = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(options.orientation);
        this._strip = new Strip(this.DOMNode);
        this._scale = new Scale(this.DOMNode, orientationBehavior, options.divisionsAmount,
            options.minValue, options.maxValue);

        if(options.isRange){
            this._runnersAndTips = new Map<Runner, Tip>([
                        [new Runner(this._strip.DOMNode, orientationBehavior, options.startPositionLow),
                            new Tip(this._strip.DOMNode, orientationBehavior, options.startValueLow.toString(),
                                options.startPositionLow, options.isTipsHidden)],
                        [new Runner(this._strip.DOMNode, orientationBehavior, options.startPositionHigh),
                            new Tip(this._strip.DOMNode, orientationBehavior, options.startPositionHigh.toString(),
                                options.startValueHigh, options.isTipsHidden, true)]
                    ]);
            this._range = new Range(this._strip.DOMNode, orientationBehavior,
                options.startPositionLow, options.startPositionHigh);
        } else {
            this._runnersAndTips = new Map<Runner, Tip>([
                [new Runner(this._strip.DOMNode, orientationBehavior, options.startPositionLow),
                    new Tip(this._strip.DOMNode, orientationBehavior, options.startValueLow.toString(), options.startPositionLow, options.isTipsHidden)]
            ]);
            this._range = new Range(this._strip.DOMNode, orientationBehavior, 0, options.startPositionLow);
        }
        this.addHadler();
    }


    public setRunnerPosition(runnerIndex: number, position: number): void{
        this.getRunners()[runnerIndex].position = position;
        let tip = this._runnersAndTips.get(this.getRunners()[runnerIndex]);
        if(tip !== undefined){
            tip.setPosition(position);
        }
    }

    public getRunnerPosition(index: number){
        return this.getRunners()[index].position;
    }

    public setRange(minEdge: number, maxEdge: number){
        this._range.minEdge = minEdge;
        this._range.maxEdge = maxEdge;
    }

    public changeModeToRange(highRunnerPosition: number, highRunnerValue: number): void{
        if(this._runnersAndTips.size == 2){
            return;
        }
        let orientationBehavior = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(this._orientation);
        let runner = new Runner(this._strip.DOMNode, orientationBehavior, highRunnerPosition);
        let tip = new Tip(this._strip.DOMNode, orientationBehavior, highRunnerValue.toString(), highRunnerPosition, this._isTipsHidden, true);
        this._runnersAndTips.set(runner, tip);
        this.setRange(this.getRunners()[0].position, this.getRunners()[1].position);
    }

    public changeModeToSingle(): void{
        if(this._runnersAndTips.size == 1){
            return;
        }
        let runner = this.getRunners()[1];
        this._runnersAndTips.delete(runner);
        runner.destroy();
        this.setRange(0, this.getRunners()[0].position);
    }

    public setRunnerTipText(runnerIndex: number, text: string): void{
        let runner = this.getRunners()[runnerIndex];
        let tip = this._runnersAndTips.get(runner);
        if( tip !== undefined ){
            tip.setInnerText(text);
        } else {
            throw new Error('tip not found');
        }
    }


    protected addHadler(): void {
        let that: View = this;

        function sliderRunnerChangeHandler(event: Event) {
            if(!that.isCustomEvent(event)){
                throw new Error('not a custom event');
            } else {
                let runnerIndex: number = 0;
                that.getRunners().forEach((runner, index)  => {
                    if(runner === event.detail.target){
                        runnerIndex = index;
                    }
                })
                that.notify('position-change-by-runner',
                    {runnerIndex: runnerIndex, position: event.detail.position});
            }
        }

        function sliderClickHandler(event: Event): void {
            if( !that.isCustomEvent(event) ){
                throw new Error('not a custom event');
            } else {
                that.notify('position-change-by-click',
                    { position: event.detail.position });
            }
        }

        this.DOMNode.on('slider-runner-change', sliderRunnerChangeHandler);
        this.DOMNode.on('slider-scale-click', sliderClickHandler);


    }

    protected isCustomEvent(event:Event): event is CustomEvent {
        return 'detail' in event;
    }

    attach(observer: IObserver): void {
        this._observers.add(observer);
    }

    detach(observer: IObserver): void {
        this._observers.delete(observer);
    }

    notify(eventType: string, data?: any): void {
        if( data !== undefined ){
            this._observers.forEach((value: IObserver) => value.update(eventType, data));
        } else {
            this._observers.forEach((value: IObserver) => value.update(eventType));
        }
    }


    protected getRunners(): Runner[] {
        return Array.from(this._runnersAndTips.keys());
    }

    get orientation(): Orientation {
        return this._orientation;
    }

    set orientation(orientation: Orientation) {
        this.DOMNode.removeClass(constants.orientationClassNames.get(this._orientation));
        this.DOMNode.addClass(<string>constants.orientationClassNames.get(orientation));
        this._orientation = orientation;
        this._runnersAndTips.forEach((tip: Tip, runner: Runner) => {
            tip.orientationBehavior = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(orientation);
            runner.orientationBehavior = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(orientation);
        })
        this.getRunners().forEach((runner: Runner, index: number) => this.setRunnerPosition(index, runner.position));
        this._range.orientationBehavior = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(orientation);
        this._scale.orientationBehavior = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(orientation);
    }

    setScaleDivisionsAmount(divisionsAmount: number) {
        this._scale.divisionsAmount = divisionsAmount;
    }

    setScale(minValue: number, maxValue: number): void {
        this._scale.setScale(minValue, maxValue);
    }

    reCreateScale(): void {
        this._scale.reCreateScale();
    }


}


