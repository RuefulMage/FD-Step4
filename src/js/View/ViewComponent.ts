import $ from 'jquery';

export abstract class ViewComponent{
    protected _DOMNode: JQuery<HTMLElement>;
    protected constructor(parentNode: JQuery<HTMLElement>, classList: string) {
        this._DOMNode = $('<div>', {'class': classList});
        parentNode.append(this._DOMNode);
    };

    get DOMNode(): JQuery<HTMLElement> {
        return this._DOMNode;
    }

    set DOMNode(value: JQuery<HTMLElement>) {
        this._DOMNode = value;
    }

    protected abstract addHadler(): void;

    destroy(): void{
        this.DOMNode.remove();
    }
};