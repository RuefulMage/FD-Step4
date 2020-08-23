import ViewComponent from './ViewComponent';
import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';

export default class Tip extends ViewComponent{

    protected isHidden: boolean = true;
    protected orientationBehavior: IOrientationBehavior;

    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior,
                isHidden: boolean = true) {
        super(parentNode, CONSTANTS.tipClassName);
        this.init(orientationBehavior, isHidden);
    }

    protected init( orientationBehavior: IOrientationBehavior, isHidden: boolean){
        if(isHidden){
            this.DOMNode.classList.add(CONSTANTS.tipHiddenClassName);
        }
        this.isHidden = isHidden;
        this.orientationBehavior = orientationBehavior;
    }


    public setPosition(newPosition: number){
        this.getOrientationBehavior().setPosition(newPosition, this.DOMNode);
    }

    public setInnerText(text: string): void{
        this.DOMNode.innerText = text;
    }


    public getHideStatus(): boolean {
        return this.isHidden;
    }

    public getOrientationBehavior(): IOrientationBehavior {
        return this.orientationBehavior;
    }

    public setOrientationBehavior(value: IOrientationBehavior) {
        this.orientationBehavior.resetStyles(this.DOMNode);
        this.orientationBehavior = value;
    }

    public hide() {
        if(!this.isHidden){
            this.DOMNode.classList.add(CONSTANTS.tipHiddenClassName);
        }
        this.isHidden = true;
    }

    public show(){
        if(this.isHidden){
            this.DOMNode.classList.remove(CONSTANTS.tipHiddenClassName);
        }
        this.isHidden = false;
    }
}