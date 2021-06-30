import Constants from '../../utils/constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../orientationBehaviors/OrientationBehavior';
import { BasicViewComponentOptions } from '../types';

class Tip extends ViewComponent {
  private orientationBehavior: OrientationBehavior;

  constructor({ parentNode, orientationBehavior }: BasicViewComponentOptions) {
    super(parentNode, Constants.tipClassName);
    this.orientationBehavior = orientationBehavior;
  }

  public setPosition(newPosition: number): void {
    this.orientationBehavior.setPosition(newPosition, this.DOMNode);
  }

  public setInnerText(text: string): void {
    this.DOMNode.innerHTML = text;
  }
}

export default Tip;
