import ViewComponent from './ViewComponent';
import Strip from './Strip';
import Runner from './Runner';
import Scale from './Scale';
import Range from './Range';
import CONSTANTS from '../../Utils/Constants';
import Tip from './Tip';
import IPublisher from '../../Observer/IPublisher';
import IObserver from '../../Observer/IObserver';
import OrientaitionBehaviorBuilder from '../OrientationBehaviors/OrientaitionBehaviorBuilder';
import Orientation from '../../Utils/Orientation';
import ViewOptions from '../../Utils/ViewOptions';

export default class View extends ViewComponent implements IPublisher{
    protected strip: Strip;
    protected range: Range;
    protected scale: Scale;
    protected orientation: Orientation;
    protected runnersAndTips: Map<Runner, Tip>;
    protected isTipsHidden: boolean;
    protected observers: Set<IObserver> = new Set<IObserver>();

    constructor(parentNode: HTMLElement, options: ViewOptions) {
        super(parentNode, CONSTANTS.viewWrapperClassName);
        this.init(options);
    }


    protected init(options: ViewOptions) {
        this.orientation = options.orientation;
        this.DOMNode.classList.add(CONSTANTS.orientationClassNames.get(options.orientation));
        let orientationBehavior = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(options.orientation);

        this.strip = new Strip(this.DOMNode);
        this.isTipsHidden = options.isTipsHidden;
        this.scale = new Scale(this.DOMNode, orientationBehavior, options.divisionsAmount,
            options.minValue, options.maxValue);

        if(options.isRange){
            this.runnersAndTips = new Map<Runner, Tip>([
                        [new Runner(this.strip.getDOMNode(), orientationBehavior),
                            new Tip(this.strip.getDOMNode(), orientationBehavior, options.isTipsHidden)],
                        [new Runner(this.strip.getDOMNode(), orientationBehavior),
                            new Tip(this.strip.getDOMNode(), orientationBehavior, options.isTipsHidden, true)]
                    ]);
            this.range = new Range(this.strip.getDOMNode(), orientationBehavior);
        } else {
            this.runnersAndTips = new Map<Runner, Tip>([
                [new Runner(this.strip.getDOMNode(), orientationBehavior),
                    new Tip(this.strip.getDOMNode(), orientationBehavior, options.isTipsHidden)]
            ]);
            this.range = new Range(this.strip.getDOMNode(), orientationBehavior);
        }
        this.addHadler();
    }


    public getRunnersAmount(): number{
        return this.getRunners().length;
    }

    public setRunnerPosition(runnerIndex: number, position: number): void{
        if(runnerIndex >= this.getRunners().length || runnerIndex < 0){
            throw new Error('runner with this index does not exits');
        }
        this.getRunners()[runnerIndex].setPosition( position );
        let tip = this.runnersAndTips.get(this.getRunners()[runnerIndex]);
        tip.setPosition(position);
    }


    public getRunnerPosition(index: number){
        if(index >= this.getRunners().length || index < 0){
            throw new Error('runner with this index does not exits');
        }
        return this.getRunners()[index].getPosition();
    }

    public setRange(minEdge: number, maxEdge: number){
        this.range.setMinEdge( minEdge );
        this.range.setMaxEdge( maxEdge ) ;
    }


    public changeModeToRange(highRunnerPosition: number, highRunnerValue: number): void{
        if(this.runnersAndTips.size == 2){
            return;
        }
        let orientationBehavior = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(this.orientation);

        let runner = new Runner(this.strip.getDOMNode(), orientationBehavior);
        runner.setPosition( highRunnerPosition );

        let tip = new Tip(this.strip.getDOMNode(), orientationBehavior, this.isTipsHidden, true);
        tip.setPosition(highRunnerPosition);
        tip.setInnerText(highRunnerValue.toString());

        this.runnersAndTips.set(runner, tip);
        this.setRange(this.getRunners()[0].getPosition(), this.getRunners()[1].getPosition());
    }

    public changeModeToSingle(): void{
        if(this.runnersAndTips.size == 1){
            return;
        }
        let runner = this.getRunners()[1];
        let tip = this.runnersAndTips.get(runner);

        this.runnersAndTips.delete(runner);
        runner.destroy();
        tip.destroy();

        this.setRange(0, this.getRunners()[0].getPosition());
    }

    public setRunnerTipText(runnerIndex: number, text: string): void{
        let runner = this.getRunners()[runnerIndex];
        let tip = this.runnersAndTips.get(runner);
        tip.setInnerText(text);
    }

    public hideTips(){
        this.isTipsHidden = true;
        this.runnersAndTips.forEach((tip => tip.hide()));
    }

    public showTips(){
        this.isTipsHidden = false;
        this.runnersAndTips.forEach(tip => tip.show());
    }

    public getHideStatus(){
        return this.isTipsHidden;
    }

    protected addHadler(): void {
        let that: View = this;

        function sliderRunnerChangeHandler(event: Event) {
            if(!isCustomEvent(event)){
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
            if( !isCustomEvent(event) ){
                throw new Error('not a custom event');
            } else {
                that.notify('position-change-by-click',
                    { position: event.detail.position });
            }
        }

        function resizeHandler(event: Event): void {
            for (let i = 0; i < that.getRunnersAmount(); i++){
                let runnerPosition = that.getRunnerPosition(i);
                that.setRunnerPosition(i, runnerPosition);
            }
            that.reCreateScale();
        }

        this.DOMNode.addEventListener('slider-runner-change', sliderRunnerChangeHandler);
        this.DOMNode.addEventListener('slider-scale-click', sliderClickHandler);
        window.addEventListener('resize', resizeHandler);

        function isCustomEvent(event:Event): event is CustomEvent {
            return 'detail' in event;
        }
    }


    protected getRunners(): Runner[] {
        return Array.from(this.runnersAndTips.keys());
    }


    public getOrientation(): Orientation {
        return this.orientation;
    }

    public setOrientation(orientation: Orientation) {

        this.DOMNode.classList.remove(<string>CONSTANTS.orientationClassNames.get(this.orientation));
        this.DOMNode.classList.add(<string>CONSTANTS.orientationClassNames.get(orientation));

        this.orientation = orientation;
        let orientationBehavior = OrientaitionBehaviorBuilder.getOrientationBehaviorByOrientation(orientation);

        this.runnersAndTips.forEach((tip: Tip, runner: Runner) => {
            tip.setOrientationBehavior(orientationBehavior);
            runner.setOrientationBehavior(orientationBehavior);
        })
        this.getRunners().forEach((runner: Runner, index: number) =>
            this.setRunnerPosition(index, runner.getPosition()));

        this.range.setOrientationBehavior( orientationBehavior );
        this.scale.setOrientationBehavior(orientationBehavior);
    }

    public setScaleDivisionsAmount(divisionsAmount: number) {
        this.scale.setDivisionsAmount(divisionsAmount);
    }

    public getDivisionsAmount(): number{
        return this.scale.getDivisionsAmount();
    }

    public setScale(minValue: number, maxValue: number): void {
        this.scale.setScale(minValue, maxValue);
    }

    public reCreateScale(): void {
        this.scale.reCreateScale();
    }


    public attach(observer: IObserver): void {
        this.observers.add(observer);
    }

    public detach(observer: IObserver): void {
        this.observers.delete(observer);
    }

    notify(eventType: string, data?: any): void {
        if( data !== undefined ){
            this.observers.forEach((value: IObserver) => value.update(eventType, data));
        } else {
            this.observers.forEach((value: IObserver) => value.update(eventType));
        }
    }


}