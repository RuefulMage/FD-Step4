import $ from 'jquery';

export abstract class ViewComponent{
    protected _DOMNode: HTMLElement;
    protected constructor(parentNode: HTMLElement, classList: string) {
        this._DOMNode = document.createElement('div');
        this._DOMNode.classList.add(classList);
        parentNode.append(this._DOMNode);
    };


    get DOMNode(): HTMLElement {
        return this._DOMNode;
    }

    set DOMNode(value: HTMLElement) {
        this._DOMNode = value;
    }

    protected abstract addHadler(): void;

    destroy(): void{
        this._DOMNode.remove();
    }
};