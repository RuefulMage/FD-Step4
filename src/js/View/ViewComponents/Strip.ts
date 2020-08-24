import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';

class Strip extends ViewComponent{

    protected orientationBehavior: IOrientationBehavior;

    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior) {
        super(parentNode, CONSTANTS.stripClassName);
        this.orientationBehavior = orientationBehavior;
        this.addHandlers();
    }


    public setOrientationBehavior(orientationBehavior: IOrientationBehavior){
        this.orientationBehavior = orientationBehavior;
    }

    public getOrientationBehavior(){
        return this.orientationBehavior;
    }

    // Навешивает обработчик клика на дорожку бегунков
    protected addHandlers(){
        let that: Strip = this;

        this.DOMNode.addEventListener('click', clickHandler);

        // Если клик был не по бегунку, то вычисляется позиция клика относительно род. элемента
        // и создается пользовательское событие 'slider-click', содержащее вычисленную позицию
        function clickHandler(event: MouseEvent) {
            let runners = that.DOMNode.getElementsByClassName(CONSTANTS.runnerClassName);
            let isTargetRunner = false;

            for (let runnerKey in runners) {
                if( event.target === runners[runnerKey]){
                    isTargetRunner = true;
                }
            }

            if (!isTargetRunner){
                let target = event.target as HTMLElement;
                let position = that.orientationBehavior
                    .getPositionFromCoordinates(event.clientX, event.clientY, that.DOMNode);

                let customEvent = new CustomEvent('slider-click',
                    {
                        bubbles: true, cancelable: true,
                        detail: {
                            position: position
                        }
                    });
                that.DOMNode.dispatchEvent(customEvent);
            }
        }
    }
}

export default Strip;