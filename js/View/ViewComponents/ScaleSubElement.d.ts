import ViewComponent from './ViewComponent';
export default class ScaleSubElement extends ViewComponent {
    protected position: number;
    constructor(parentNode: HTMLElement, position: number);
    getPosition(): number;
    setPosition(position: number): void;
}
