import CONSTANTS from '../../Utils/Constants';
import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import ViewComponent from './ViewComponent';

class Range extends ViewComponent {
  protected lowEdge: number;

  protected highEdge: number;

  protected orientationBehavior: IOrientationBehavior;

  constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior,
    lowEdge: number = 0, highEdge: number = 100) {
    super(parentNode, CONSTANTS.rangeClassName);
    this.orientationBehavior = orientationBehavior;
    this.lowEdge = lowEdge;
    this.highEdge = highEdge;
  }

  public getLowEdge(): number {
    return this.lowEdge;
  }

  public setLowEdge(value: number): void {
    this.lowEdge = value;
    this.orientationBehavior.setRangePositions(this.lowEdge, this.highEdge, this.DOMNode);
  }

  public getHighEdge(): number {
    return this.highEdge;
  }

  public setHighEdge(value: number): void {
    this.highEdge = value;
    this.orientationBehavior.setRangePositions(this.lowEdge, this.highEdge, this.DOMNode);
  }

  public getOrientationBehavior(): IOrientationBehavior {
    return this.orientationBehavior;
  }

  public setOrientationBehavior(value: IOrientationBehavior): void {
    this.orientationBehavior = value;
    this.orientationBehavior.resetStyles(this.DOMNode);
    this.orientationBehavior.setRangePositions(this.lowEdge, this.highEdge, this.DOMNode);
  }
}

export default Range;
