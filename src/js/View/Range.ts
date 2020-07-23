import { ViewComponent } from './ViewComponent';
import { constants } from '../Utils/Constants';
import { IOrientationBehavior } from './IOrientationBehavior';

export class Range extends ViewComponent{
    protected _minEdge: number = 0;
    protected _maxEdge: number = 100;
    protected _orientationBehavior: IOrientationBehavior;

    constructor(parentNode: JQuery<HTMLElement>,  orientationBehavior: IOrientationBehavior) {
        super(parentNode, constants.rangeClassName);
        this._orientationBehavior = orientationBehavior;
    }

    get minEdge(): number {
        return this._minEdge;
    }


    set minEdge(value: number) {
        this._minEdge = value;
        this.orientationBehavior.setRangePositions(this.minEdge, this.maxEdge, this.DOMNode);
    }

    get maxEdge(): number {
        return this._maxEdge;
    }

    set maxEdge(value: number) {
        this._maxEdge = value;
        this.orientationBehavior.setRangePositions(this.minEdge, this.maxEdge, this.DOMNode);
    }

    get orientationBehavior(): IOrientationBehavior {
        return this._orientationBehavior;
    }

    set orientationBehavior(value: IOrientationBehavior) {
        this._orientationBehavior = value;
        this.orientationBehavior.resetStyles(this.DOMNode);
        this.orientationBehavior.setRangePositions(this.minEdge, this.maxEdge, this.DOMNode);
    }

    protected addHadler(): void {
        throw new Error('not implemented');
    }

}