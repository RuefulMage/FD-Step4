import ViewComponent from '../../ViewComponent';
declare class ScaleSubElement extends ViewComponent {
    private position;
    constructor(parentNode: HTMLElement, position: number);
    getPosition(): number;
    setPosition(position: number): void;
}
export default ScaleSubElement;
