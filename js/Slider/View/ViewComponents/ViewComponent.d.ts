import Publisher from '../../Publisher/Publisher';
declare class ViewComponent extends Publisher {
    protected DOMNode: HTMLElement;
    constructor(parentNode: HTMLElement, classList: string);
    getDOMNode(): HTMLElement;
    destroy(): void;
}
export default ViewComponent;
