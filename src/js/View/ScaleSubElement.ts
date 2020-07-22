import { ViewComponent } from './ViewComponent';
import { constants } from '../Utils/Constants';

export class ScaleSubElement extends ViewComponent{
    protected _position: number;

    constructor(parentNode: JQuery<HTMLElement>, position: number) {
        super(parentNode, constants.scaleSubElementClassName);
        this._position = position;
        this.DOMNode.attr('data-scale-position', this.position);
    }

    get position(): number {
        return this._position;
    }

    set position(position: number) {
        this._position = position;
        this.DOMNode.attr('data-scale-position', this.position);
    }

    protected addHadler(): void {
        throw new Error('not implemented');
    }
}