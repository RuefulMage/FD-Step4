export default abstract class ViewComponent {
    protected DOMNode: HTMLElement;
    protected constructor(parentNode: HTMLElement, classList: string);
    getDOMNode(): HTMLElement;
    destroy(): void;
}
