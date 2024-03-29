import Publisher from '../../publisher/Publisher';

class ViewComponent extends Publisher {
  protected DOMNode: HTMLElement;

  constructor(parentNode: HTMLElement, classList: string) {
    super();
    this.DOMNode = document.createElement('div');
    this.DOMNode.classList.add(...classList.split(' '));
    parentNode.append(this.DOMNode);
  }

  public getDOMNode(): HTMLElement {
    return this.DOMNode;
  }

  public destroy(): void {
    this.DOMNode.remove();
  }
}

export default ViewComponent;
