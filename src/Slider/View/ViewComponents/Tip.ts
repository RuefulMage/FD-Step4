import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';
import OrientationBehavior from '../OrientationBehaviors/OrientationBehavior';

class Tip extends ViewComponent {
  private isHidden: boolean;

  private orientationBehavior: OrientationBehavior;

  constructor(parentNode: HTMLElement, isHidden: boolean = true, orientationBehavior: OrientationBehavior) {
    super(parentNode, CONSTANTS.tipClassName);
    this.orientationBehavior = orientationBehavior;
    if (isHidden) {
      this.DOMNode.classList.add(CONSTANTS.tipHiddenClassName);
    }
    this.isHidden = isHidden;
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
      this.DOMNode.classList.add(CONSTANTS.tipHiddenClassName);
    }
    this.isHidden = true;
  }

  public show(): void {
    if (this.isHidden) {
      this.DOMNode.classList.remove(CONSTANTS.tipHiddenClassName);
    }
    this.isHidden = false;
  }
}

export default Tip;
