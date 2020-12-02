import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';

class Range extends ViewComponent {
  private lowEdge: number;

  private highEdge: number;

  constructor(parentNode: HTMLElement,
    lowEdge: number = 0, highEdge: number = 100) {
    super(parentNode, CONSTANTS.rangeClassName);
    this.lowEdge = lowEdge;
    this.highEdge = highEdge;
  }

  public getLowEdge(): number {
    return this.lowEdge;
  }

  public setLowEdge(value: number): void {
    this.lowEdge = value;
    OrientationBehavior.setRangePositions(this.lowEdge, this.highEdge, this.DOMNode);
  }

  public getHighEdge(): number {
    return this.highEdge;
  }

  public setHighEdge(value: number): void {
    this.highEdge = value;
    OrientationBehavior.setRangePositions(this.lowEdge, this.highEdge, this.DOMNode);
  }
}

export default Range;
