import ViewComponent from './ViewComponent';
import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';

export default class Strip extends ViewComponent{

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

    protected addHandlers(){
        let that: Strip = this;

        this.DOMNode.addEventListener('click', clickHandler);

        function clickHandler(event: MouseEvent) {
            let runners = that.DOMNode.getElementsByClassName(CONSTANTS.runnerClassName);
            let isTargetRunner = false;

            for (let runnersKey in runners) {
                if( event.target === runners[runnersKey]){
                    isTargetRunner = true;
                }
            }

            if (!isTargetRunner){
                let target = event.target as HTMLElement;
                let position = that.orientationBehavior
                    .getPositionFromCoordinates(event.clientX, event.clientY, that.DOMNode);

                let customEvent = new CustomEvent('slider-scale-click',
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