interface IControllerHandler {
    handlePositionChangeByDrag(data: any): void;

    handlePositionChangeByClick(data: any): void;

    handleEdgeValueChange(): void;

    handleValueChange(): void;

    handleResize(data: any): void;

    handleStepChange(): void;

    updateTipsPositionAndText(): void;

    getScalePositions(divisionsAmount: number): Map<number, number>;
}

export default IControllerHandler;
