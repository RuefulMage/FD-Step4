import ViewComponent from './ViewComponent';
import CONSTANTS from '../../Utils/Constants';

export default class ScaleSubElement extends ViewComponent{
    protected position: number;

    constructor(parentNode: HTMLElement, position: number) {
        super(parentNode, CONSTANTS.scaleSubElementClassName);
        this.position = position;
    this.DOMNode.setAttribute('data-scale-position', this.position.toString());
    }

    public getPosition(): number {
        return this.position;
    }

    public setPosition(position: number) {
        this.position = position;
        this.DOMNode.setAttribute('data-scale-position', this.position.toString());
    }
}