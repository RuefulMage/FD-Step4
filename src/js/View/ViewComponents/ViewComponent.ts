export default abstract class ViewComponent{
    protected DOMNode: HTMLElement;
    protected constructor(parentNode: HTMLElement, classList: string) {
        this.DOMNode = document.createElement('div');
        this.DOMNode.classList.add(classList);
        parentNode.append(this.DOMNode);
    };


    getDOMNode(): HTMLElement {
        return this.DOMNode;
    }


    destroy(): void{
        this.DOMNode.remove();
    }
};