export default interface IControllerHandler {
    positionChangeByRunnerHandler(data: any): void;
    positionChangeByClickHandler(data: any): void;
    edgeValueChangeHandler(): void;
    valueChangeHandler(): void;
}
