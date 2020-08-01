import ViewComponent from './ViewComponent';
import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';

export default class Range extends ViewComponent{
    protected minEdge: number = 0;
    protected maxEdge: number = 100;
    protected orientationBehavior: IOrientationBehavior;

    constructor(parentNode: HTMLElement,  orientationBehavior: IOrientationBehavior) {
        super(parentNode, CONSTANTS.rangeClassName);
        this.orientationBehavior = orientationBehavior;
    }

    public getMinEdge(): number {
        return this.minEdge;
    }


    public setMinEdge(value: number) {
        this.minEdge = value;
        this.orientationBehavior.setRangePositions(this.minEdge, this.maxEdge, this.DOMNode);
    }

    public getMaxEdge(): number {
        return this.maxEdge;
    }

    public setMaxEdge(value: number) {
        this.maxEdge = value;
        this.orientationBehavior.setRangePositions(this.minEdge, this.maxEdge, this.DOMNode);
    }

    public getOrientationBehavior(): IOrientationBehavior {
        return this.orientationBehavior;
    }

    public setOrientationBehavior(value: IOrientationBehavior) {
        this.orientationBehavior = value;
        this.orientationBehavior.resetStyles(this.DOMNode);
        this.orientationBehavior.setRangePositions(this.minEdge, this.maxEdge, this.DOMNode);
    }
}