import Constants from '../../../../utils/constants';
import ViewComponent from '../../ViewComponent';

class ScaleSubElement extends ViewComponent {
  constructor(parentNode: HTMLElement, private position: number) {
    super(parentNode, Constants.scaleSubElementClassName);
    this.DOMNode.setAttribute('data-scale-position', this.position.toString());
  }

  public getPosition(): number {
    return this.position;
  }

  public setPosition(position: number): void {
    this.position = position;
    this.DOMNode.setAttribute('data-scale-position', this.position.toString());
  }
}

export default ScaleSubElement;
