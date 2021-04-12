import Constants from '../../utils/constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../orientationBehaviors/OrientationBehavior';
import { basicViewComponentOptions } from '../../utils/types';

class Tip extends ViewComponent {
  private orientationBehavior: OrientationBehavior;

  constructor({ parentNode, orientationBehavior }: basicViewComponentOptions,
    private isHidden: boolean = true) {
    super(parentNode, Constants.tipClassName);
    this.orientationBehavior = orientationBehavior;
    if (isHidden) {
      this.DOMNode.classList.add(Constants.tipHiddenClassName);
    }
  }

  public setPosition(newPosition: number): void {
    this.orientationBehavior.setPosition(newPosition, this.DOMNode);
  }

  public setInnerText(text: string): void {
    this.DOMNode.innerHTML = text;
  }

  public getHideStatus(): boolean {
    return this.isHidden;
  }

  public hide(): void {
    if (!this.isHidden) {
      this.DOMNode.classList.add(Constants.tipHiddenClassName);
    }
    this.isHidden = true;
  }

  public show(): void {
    if (this.isHidden) {
      this.DOMNode.classList.remove(Constants.tipHiddenClassName);
    }
    this.isHidden = false;
  }
}

export default Tip;
