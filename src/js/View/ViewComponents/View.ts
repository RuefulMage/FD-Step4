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

class View extends ViewComponent implements IPublisher{
    protected strip: Strip;
    protected range: Range;
    protected scale: Scale;
    protected orientation: Orientation;
    protected runnersAndTips: Map<number, {runner: Runner, tip: Tip}>;
    protected isTipsHidden: boolean;
    protected observers: Set<IObserver> = new Set<IObserver>();

    constructor(parentNode: HTMLElement, options: {
        orientation?: Orientation, isRange?: boolean,
        isTipsHidden?: boolean, divisionsAmount?: number,
        minValue?: number, maxValue?: number }) {

        super(parentNode, CONSTANTS.viewWrapperClassName);
        this.init(options);
    }


    protected init(options: {
        orientation?: Orientation, isRange?: boolean, isTipsHidden?: boolean, divisionsAmount?: number,
        minValue?: number, maxValue?: number }) {

        let {orientation = Orientation.HORIZONTAL, isRange = false, isTipsHidden = true, divisionsAmount = 2,
            minValue = 0, maxValue = 100} = options;

        this.orientation = orientation;
        this.DOMNode.classList.add(CONSTANTS.orientationClassNames.get(orientation));
        let orientationBehavior = OrientationBehaviorBuilder.getOrientationBehaviorByOrientation(orientation);

        this.strip = new Strip(this.DOMNode, orientationBehavior);
        this.isTipsHidden = isTipsHidden;
        this.scale = new Scale(this.DOMNode, {orientationBehavior, divisionsAmount, minValue, maxValue});

        if(isRange){
            let lowValueRunner =  new Runner(this.strip.getDOMNode(), orientationBehavior);
            let lowValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, isTipsHidden);

            let highValueRunner = new Runner(this.strip.getDOMNode(), orientationBehavior);
            let highValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, isTipsHidden);

            this.runnersAndTips = new Map([
                        [0 , {runner: lowValueRunner, tip: lowValueTip}],
                        [1 , {runner: highValueRunner, tip: highValueTip}]]);
        } else {
            let lowValueRunner =  new Runner(this.strip.getDOMNode(), orientationBehavior);
            let lowValueTip = new Tip(this.strip.getDOMNode(), orientationBehavior, isTipsHidden);

            this.runnersAndTips = new Map([[0,{runner: lowValueRunner, tip: lowValueTip}]]);
        }

        this.range = new Range(this.strip.getDOMNode(), orientationBehavior);
        this.addHandlers();
    }

    // Ф-ии чтения и изменения св-в бегунков

    public getRunnersAmount(): number{
        return this.runnersAndTips.size;
    }

    public setRunnerPosition(runnerIndex: number, position: number): void{
        let isRunnerExist = !(runnerIndex >= this.getRunnersAmount() || runnerIndex < 0);

        if(!isRunnerExist){
            throw new Error('runner with this index does not exits');
        }
        this.runnersAndTips.get(runnerIndex).runner.setPosition( position );
    }


    public getRunnerPosition(runnerIndex: number){
        let isRunnerExist = !(runnerIndex >= this.getRunnersAmount() || runnerIndex < 0);

        if(!isRunnerExist){
            throw new Error('runner with this index does not exits');
        }
        return this.runnersAndTips.get(runnerIndex).runner.getPosition();
    }

    // Ф-ии изменения и чтения св-в подсказок
    public setTipPosition(tipIndex: number, position: number){
        let isTipExist = !(tipIndex >= this.getRunnersAmount() || tipIndex < 0);

        if(!isTipExist){
            throw new Error('tip with this index does not exits');
        }
        let tip = this.runnersAndTips.get(tipIndex).tip;
        tip.setPosition(position);
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


    // Ф-ии работы с режимом слайдера(промежуток или один бегунок)
    public setRange(minEdge: number, maxEdge: number){
        this.range.setLowEdge( minEdge );
        this.range.setHighEdge( maxEdge ) ;
    }


    public changeModeToRange(highRunnerPosition: number, highValue: number): void{
        if(this.runnersAndTips.size === 2){
            return;
        }

        let orientationBehavior = OrientationBehaviorBuilder.getOrientationBehaviorByOrientation(this.orientation);

        let runner = new Runner(this.strip.getDOMNode(), orientationBehavior);
        runner.setPosition( highRunnerPosition );

        let tip = new Tip(this.strip.getDOMNode(), orientationBehavior, this.isTipsHidden);
        tip.setInnerText(highValue.toString());
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



    // Ф-ии работы с ориентацией слайдера
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

        this.range.setOrientationBehavior(orientationBehavior);
        this.scale.setOrientationBehavior(orientationBehavior);
        this.strip.setOrientationBehavior(orientationBehavior);
    }


    // Ф-ии чтения и изменения св-в шкалы
    public setScaleDivisionsAmount(divisionsAmount: number) {
        this.scale.setDivisionsAmount(divisionsAmount);
    }

    public getDivisionsAmount(): number{
        return this.scale.getDivisionsAmount();
    }

    public setScaleEdges(minValue: number, maxValue: number): void {
        this.scale.setScaleEdges(minValue, maxValue);
    }

    public reCreateScale(): void {
        this.scale.reCreateScale();
    }


    // Ф-ии оповещателя
    public attach(observer: IObserver): void {
        this.observers.add(observer);
    }

    public detach(observer: IObserver): void {
        this.observers.delete(observer);
    }

    public notify(eventType: string, data?: any): void {
        if( data !== undefined ){
            this.observers.forEach((observer: IObserver) => observer.update(eventType, data));
        } else {
            this.observers.forEach((observer: IObserver) => observer.update(eventType));
        }
    }


    // Навешивает обработчики кастомных событий 'slider-drag' и 'slider-click' и события resize
    protected addHandlers(): void {
        let that: View = this;

        this.DOMNode.addEventListener('slider-drag', handleRunnerDrag);
        this.DOMNode.addEventListener('slider-click', handleSliderClick);
        window.addEventListener('resize', handleResize);

        // Оповещает подписчиков и передает им индекс бегунка, на котором произошло событие
        // и полученную позицию
        function handleRunnerDrag(event: Event) {
            if(!isCustomEvent(event)){
                throw new Error('not a custom event');
            } else {
                let runnerIndex: number = 0;
                that.runnersAndTips.forEach((item, index)  => {
                    if(item.runner === event.detail.target){
                        runnerIndex = index;
                    }
                })
                that.notify('position-change-by-drag',
                    {runnerIndex: runnerIndex, position: event.detail.position});
            }

        }

        // Оповещает подписчиков и передает им полученную позицию
        function handleSliderClick(event: Event): void {
            if( !isCustomEvent(event) ){
                throw new Error('not a custom event');
            } else {
                that.notify('position-change-by-click',
                    { position: event.detail.position });
            }

        }

        // Обновляет позиции бегунков и подсказок и перезадает шкалу
        function handleResize(): void {
            for (let index = 0; index < that.getRunnersAmount(); index++){
                let runnerPosition = that.getRunnerPosition(index);
                that.setRunnerPosition(index, runnerPosition);
                that.setTipPosition(index, runnerPosition);
            }
            that.reCreateScale();
        }

        function isCustomEvent(event:Event): event is CustomEvent {
            return (event as CustomEvent).detail !== undefined;
        }
    }
}

export default View;