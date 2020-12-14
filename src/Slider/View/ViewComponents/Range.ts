import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';

class Range extends ViewComponent {
  private lowEdge: number;

  private highEdge: number;

  private orientationBehavior: OrientationBehavior;

  constructor(parentNode: HTMLElement, orientationBehavior: OrientationBehavior) {
    super(parentNode, CONSTANTS.rangeClassName);
    this.orientationBehavior = orientationBehavior;
    this.lowEdge = 0;
    this.highEdge = 100;
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
}

export default Range;
