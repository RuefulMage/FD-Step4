interface IControllerHandler {
    handlePositionChangeByDrag(data: any): void;

    handlePositionChangeByClick(data: any): void;

    handleEdgeValueChange(): void;

    handleValueChange(): void;

    updateTipsPositionAndText(): void;
}

export default IControllerHandler;
