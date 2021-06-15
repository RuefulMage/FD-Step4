import Constants from '../../utils/constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../orientationBehaviors/OrientationBehavior';
import { BasicViewComponentOptions } from '../types';

class Range extends ViewComponent {
  private lowEdge: number;

  private highEdge: number;

  private orientationBehavior: OrientationBehavior;

  constructor({ parentNode, orientationBehavior }: BasicViewComponentOptions) {
    super(parentNode, Constants.rangeClassName);
    this.orientationBehavior = orientationBehavior;
    this.lowEdge = 0;
    this.highEdge = 100;
  }

  public setLowEdge(value: number): void {
    this.lowEdge = value;
    this.orientationBehavior.setRangePositions(this.lowEdge, this.highEdge, this.DOMNode);
  }

  public setHighEdge(value: number): void {
    this.highEdge = value;
    this.orientationBehavior.setRangePositions(this.lowEdge, this.highEdge, this.DOMNode);
  }
}

export default Range;
