abstract class ViewComponent {
  protected DOMNode: HTMLElement;

  protected constructor(parentNode: HTMLElement, classList: string) {
    this.DOMNode = document.createElement('div');
    this.DOMNode.classList.add(classList);
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
