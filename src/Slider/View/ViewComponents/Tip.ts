import IOrientationBehavior from '../OrientationBehaviors/IOrientationBehavior';
import CONSTANTS from '../../Utils/Constants';
import ViewComponent from './ViewComponent';

class Tip extends ViewComponent {
  private isHidden: boolean;

  private orientationBehavior: IOrientationBehavior;

  constructor(parentNode: HTMLElement, orientationBehavior: IOrientationBehavior,
    isHidden: boolean = true) {
    super(parentNode, CONSTANTS.tipClassName);
    this.init(orientationBehavior, isHidden);
  }

  private init(orientationBehavior: IOrientationBehavior, isHidden: boolean) {
    if (isHidden) {
      this.DOMNode.classList.add(CONSTANTS.tipHiddenClassName);
    }
    this.isHidden = isHidden;
    this.orientationBehavior = orientationBehavior;
  }

  public setPosition(newPosition: number): void {
    this.getOrientationBehavior().setPosition(newPosition, this.DOMNode);
  }

  public setInnerText(text: string): void {
    this.DOMNode.innerHTML = text;
  }

  public getHideStatus(): boolean {
    return this.isHidden;
  }

  public getOrientationBehavior(): IOrientationBehavior {
    return this.orientationBehavior;
  }

  public setOrientationBehavior(value: IOrientationBehavior): void {
    this.orientationBehavior.resetStyles(this.DOMNode);
    this.orientationBehavior = value;
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
