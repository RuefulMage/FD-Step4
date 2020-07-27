export interface IControllerHandler {

    positionChangeByRunnerHandler(data: any):void;
    positionChangeByClickHandler(data:any): void;
    setLowRunnerPosition(): void;
    setHighRunnerPosition(): void;
    reCreateScale(): void;
    isRange(): boolean;

}