import ViewComponent from './ViewComponent';
import Strip from './Strip';
import Runner from './Runner';
import Scale from './Scale';
import Range from './Range';
import CONSTANTS from '../../Utils/Constants';
import Tip from './Tip';
import IPublisher from '../../Observer/IPublisher';
import IObserver from '../../Observer/IObserver';
import OrientationBehaviorBuilder from '../OrientationBehaviors/OrientaitionBehaviorBuilder';
import Orientation from '../../Utils/Orientation';
import ViewOptions from '../../Utils/ViewOptions';

export default class View extends ViewComponent implements IPublisher{
    protected strip: Strip;
    protected range: Range;
    protected scale: Scale;
    protected orientation: Orientation;
    protected runnersAndTips: Map<number, {runner: Runner, tip: Tip}>;
    protected isTipsHidden: boolean;
    protected observers: Set<IObserver> = new Set<IObserver>();

    constructor(parentNode: HTMLElement, options: ViewOptions) {
        super(parentNode, CONSTANTS.viewWrapperClassName);
        this.init(options);
    }


    protected init(options: ViewOptions) {
        this.orientation = options.orientation;
        this.DOMNode.classList.add(CONSTANTS.orientationClassNames.get(options.orientation));
        let orientationBehavior = OrientationBehaviorBuilder.getOrientationBehaviorByOrientation(options.orientation);

        this.strip = new Strip(this.DOMNode, orientationBehavior);
        this.isTipsHidden = options.isTipsHidden;
        this.scale = new Scale(this.DOMNode, orientationBehavior, options.divisionsAmount,
            options.minValue, options.maxValue);

        if(options.isRange){
            let lowValueRunner =  new Runner(this.strip.getDOMNode(), orientationBehavior);
            let lowValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, options.isTipsHidden);

            let highValueRunner = new Runner(this.strip.getDOMNode(), orientationBehavior);
            let highValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, options.isTipsHidden);


            this.runnersAndTips = new Map([
                        [0 , {runner: lowValueRunner, tip: lowValueTip}],
                        [1 , {runner: highValueRunner, tip: highValueTip}]]);

            this.range = new Range(this.strip.getDOMNode(), orientationBehavior);
        } else {

            let lowValueRunner =  new Runner(this.strip.getDOMNode(), orientationBehavior);
            let lowValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, options.isTipsHidden);

            this.runnersAndTips = new Map([[0,{runner: lowValueRunner, tip: lowValueTip}]]);
            this.range = new Range(this.strip.getDOMNode(), orientationBehavior);
        }
        this.addHandlers();
    }


    public getRunnersAmount(): number{
        return this.runnersAndTips.size;
    }

    public setRunnerPosition(runnerIndex: number, position: number): void{
        if(runnerIndex >= this.getRunnersAmount() || runnerIndex < 0){
            throw new Error('runner with this index does not exits');
        }
        this.runnersAndTips.get(runnerIndex).runner.setPosition( position );
    }

    public setTipPosition(tipIndex: number, position: number){
        if(tipIndex >= this.getRunnersAmount() || tipIndex < 0){
            throw new Error('runner with this index does not exits');
        }
        let tip = this.runnersAndTips.get(tipIndex).tip;
        tip.setPosition(position);
    }

    public getRunnerPosition(index: number){
        if(index >= this.getRunnersAmount() || index < 0){
            throw new Error('runner with this index does not exits');
        }
        return this.runnersAndTips.get(index).runner.getPosition();
    }

    public setRange(minEdge: number, maxEdge: number){
        this.range.setMinEdge( minEdge );
        this.range.setMaxEdge( maxEdge ) ;
    }


    public changeModeToRange(highRunnerPosition: number, highRunnerValue: number): void{
        if(this.runnersAndTips.size === 2){
            return;
        }

        let orientationBehavior = OrientationBehaviorBuilder.getOrientationBehaviorByOrientation(this.orientation);

        let runner = new Runner(this.strip.getDOMNode(), orientationBehavior);
        runner.setPosition( highRunnerPosition );

        let tip = new Tip(this.strip.getDOMNode(), orientationBehavior, this.isTipsHidden);
        tip.setInnerText(highRunnerValue.toString());
        tip.setPosition(highRunnerPosition);

        this.runnersAndTips.set(1 ,{runner: runner, tip: tip});
        this.setRange(this.runnersAndTips.get(0).runner.getPosition(), this.runnersAndTips.get(1).runner.getPosition());
    }

    public changeModeToSingle(): void{
        if(this.runnersAndTips.size === 1){
            return;
        }

        let runner = this.runnersAndTips.get(1).runner;
        let tip = this.runnersAndTips.get(1).tip;

        this.runnersAndTips.delete(1);
        runner.destroy();
        tip.destroy();

        this.setRange(0, this.runnersAndTips.get(0).runner.getPosition());
    }

    public setTipText(tipIndex: number, text: string): void{
        let tip = this.runnersAndTips.get(tipIndex).tip;
        tip.setInnerText(text);
    }

    public hideTips(){
        this.isTipsHidden = true;
        this.runnersAndTips.forEach((item => item.tip.hide()));
    }

    public hideTip(tipIndex: number){
        this.runnersAndTips.get(tipIndex).tip.hide();
    }

    public showTips(){
        this.isTipsHidden = false;
        this.runnersAndTips.forEach(item => item.tip.show());
    }

    public showTip(tipIndex: number){
        this.isTipsHidden = false;
        this.runnersAndTips.get(tipIndex).tip.show();
    }

    public getHideStatus(){
        return this.isTipsHidden;
    }

    protected addHandlers(): void {
        let that: View = this;

        function sliderRunnerChangeHandler(event: Event) {
            if(!isCustomEvent(event)){
                throw new Error('not a custom event');
            } else {
                let runnerIndex: number = 0;
                that.runnersAndTips.forEach((item, index)  => {
                    if(item.runner === event.detail.target){
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

        function resizeHandler(): void {
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



    public getOrientation(): Orientation {
        return this.orientation;
    }

    public setOrientation(orientation: Orientation) {

        this.DOMNode.classList.remove(<string>CONSTANTS.orientationClassNames.get(this.orientation));
        this.DOMNode.classList.add(<string>CONSTANTS.orientationClassNames.get(orientation));

        this.orientation = orientation;
        let orientationBehavior = OrientationBehaviorBuilder.getOrientationBehaviorByOrientation(orientation);

        this.runnersAndTips.forEach(item => {
            item.tip.setOrientationBehavior(orientationBehavior);
            item.tip.setPosition(item.runner.getPosition());

            item.runner.setOrientationBehavior(orientationBehavior);
            item.runner.setPosition(item.runner.getPosition());
        });

        this.range.setOrientationBehavior( orientationBehavior );
        this.scale.setOrientationBehavior(orientationBehavior);
        this.strip.setOrientationBehavior(orientationBehavior);
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