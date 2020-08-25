import ViewComponent from './ViewComponent';
declare class ScaleSubElement extends ViewComponent {
    protected position: number;
    constructor(parentNode: HTMLElement, position: number);
    getPosition(): number;
    setPosition(position: number): void;
}
export default ScaleSubElement;
