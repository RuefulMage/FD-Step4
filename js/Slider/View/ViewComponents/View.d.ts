import Orientation from '../../Utils/Orientation';
import ViewComponent from './ViewComponent';
declare class View extends ViewComponent {
    private strip;
    private range;
    private scale;
    private orientation;
    private orientationBehavior;
    private runnersAndTips;
    private isTipsHidden;
    constructor(parentNode: HTMLElement, options: {
        orientation?: Orientation;
        isRange?: boolean;
        isTipsHidden?: boolean;
    });
    private init;
    hideTips(): void;
    showTips(): void;
    getHideStatus(): boolean;
    getOrientation(): Orientation;
    setOrientation(orientation: Orientation): void;
    computeDivisionsAmountBySize(): number;
    updateView(runnersPositions: number[], tipsValues: number[], scalePositions: Map<number, number>, isRange: boolean): void;
    private hideTip;
    private showTip;
    private setRange;
    private changeModeToRange;
    private changeModeToSingle;
    private setScale;
    private getRunnersAmount;
    private setRunnerPosition;
    private getRunnerPosition;
    private setTipPosition;
    private setTipText;
    private addHandlers;
    private setRunnerToCurrent;
    private handleRunnerDrag;
    private handleSliderClick;
    private handleResize;
    private updateViewForInterval;
    private updateAllTipsPositionAndText;
    private updateViewForSingleRunner;
    private joinTips;
}
export default View;
