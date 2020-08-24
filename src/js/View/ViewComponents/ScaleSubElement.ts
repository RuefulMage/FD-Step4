import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';

class ScaleSubElement extends ViewComponent {
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

export default ScaleSubElement;