import { ViewComponent } from './ViewComponent';
import { constants } from '../Utils/Constants';
import { IOrientationBehavior } from './IOrientationBehavior';

export class Tip extends ViewComponent{

    protected _isHidden: boolean = true;
    protected _orientationBehavior: IOrientationBehavior;

    constructor(parentNode: JQuery<HTMLElement>, orientationBehavior: IOrientationBehavior,
                isHidden: boolean = true, isBelow: boolean = false) {
        super(parentNode, isBelow ?
            constants.tipClassName + ' ' + constants.tipBellowClassName:
            constants.tipClassName);
        this.isHidden = isHidden;
        this._orientationBehavior = orientationBehavior;
    }

    setPosition(newPosition: number){
        this.orientationBehavior.setPosition(newPosition, this.DOMNode);
    }

    public setInnerText(text: string): void{
        this.DOMNode.text(text);
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
            this.DOMNode.addClass(constants.tipHiddenClassName);
        } else {
            this.DOMNode.removeClass(constants.tipHiddenClassName);
        }
    }
}