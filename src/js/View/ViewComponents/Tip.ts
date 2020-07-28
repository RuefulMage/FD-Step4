import { ViewComponent } from './ViewComponent';
import { constants } from '../../Utils/Constants';
import { IOrientationBehavior } from '../OrientationBehaviors/IOrientationBehavior';

export class Tip extends ViewComponent{

    protected _isHidden: boolean = true;
    protected _orientationBehavior: IOrientationBehavior;

    constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior,
                isHidden: boolean = true, isBelow: boolean = false) {
        super(parentNode, constants.tipClassName);
        if( isBelow ){
            this.DOMNode.classList.add(constants.tipBellowClassName);
        }
        this.isHidden = isHidden;
        this._orientationBehavior = orientationBehavior;
    }

    public setPosition(newPosition: number){
        this.orientationBehavior.setPosition(newPosition, this.DOMNode);
    }

    public setInnerText(text: string): void{
        this.DOMNode.innerText = text;
    }

    protected addHadler(): void {
        throw new Error('not implemented');
    }

    get isHidden(): boolean {
        return this._isHidden;
    }

    get orientationBehavior(): IOrientationBehavior {
        return this._orientationBehavior;
    }

    set orientationBehavior(value: IOrientationBehavior) {
        this.orientationBehavior.resetStyles(this.DOMNode);
        this._orientationBehavior = value;
    }

    set isHidden(value: boolean) {
        this._isHidden = value;
        if( value ){
            this.DOMNode.classList.add(constants.tipHiddenClassName);
        } else {
            this.DOMNode.classList.remove(constants.tipHiddenClassName);
        }
    }
}