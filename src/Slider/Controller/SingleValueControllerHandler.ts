import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import IControllerHandler from './IControllerHandler';

class SingleValueControllerHandler implements IControllerHandler {
    protected view: View;

    protected model: Model;

    constructor(view: View, model: Model) {
      this.view = view;
      this.model = model;
      this.view.changeModeToSingle();
      this.updateTipsPositionAndText();
    }

    // Вызывается при изменении значения бегунка в модели
    public handleValueChange(): void {
      this.view.setRunnerPosition(0, this.model.getLowValueInPercent());
      this.updateTipsPositionAndText();
      this.view.setRange(0, this.model.getLowValueInPercent());
    }

    // Вызывается при клике на шкалу или дорожку бегунка в Виде. Перемещает бегунок к данной позиции
    public handlePositionChangeByClick(data: any): void {
      this.model.setLowValueByPercent(data.position);
      const newPosition = this.model.getLowValueInPercent();
      this.view.setRunnerPosition(0, newPosition);
      this.updateTipsPositionAndText();
      this.view.setRange(0, this.model.getLowValueInPercent());
    }

    // Вызывается при перемещении бегунка.
    // Записывает данную позицию в Модель и перемещает бегунок на позицию.
    public handlePositionChangeByDrag(data: any): void {
      if (data.runnerIndex === 0) {
        this.model.setLowValueByPercent(data.position);
        const newPosition = this.model.getLowValueInPercent();
        this.view.setRunnerPosition(0, newPosition);
        this.updateTipsPositionAndText();
        this.view.setRange(0, this.model.getLowValueInPercent());
      } else {
        throw new Error('slider in single value mode');
      }
    }

    // Вызывает при изменении значений maxValue и minValue в Модели
    public handleEdgeValueChange(): void {
      this.view.setScaleEdges(this.model.getMinValue(), this.model.getMaxValue());
    }

    public updateTipsPositionAndText(): void {
      this.view.setTipText(0, this.model.getLowValue().toString());
      this.view.setTipPosition(0, this.model.getLowValueInPercent());
    }
}

export default SingleValueControllerHandler;
