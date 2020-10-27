import Big from 'big.js';
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
      const divisionsAmount = this.view.getDivisionsAmount();
      this.updateScale(divisionsAmount);
    }

    // Вызывается при изменении окна браузера
    public handleResize(data: any): void {
      this.updateScale(data.scaleDivisionsAmount);
      const runnerPosition = this.model.getLowValueInPercent();
      this.view.setRunnerPosition(0, runnerPosition);
      this.updateTipsPositionAndText();
      this.view.setRange(0, this.model.getLowValueInPercent());
    }

    // Вызывается при изменении шага
    public handleStepChange(): void {
      const divisionsAmount = this.view.getDivisionsAmount();
      this.updateScale(divisionsAmount);
      this.updateTipsPositionAndText();
      const runnerPosition = this.model.getLowValueInPercent();
      this.view.setRunnerPosition(0, runnerPosition);
    }

    public updateTipsPositionAndText(): void {
      this.view.setTipText(0, this.model.getLowValue().toString());
      this.view.setTipPosition(0, this.model.getLowValueInPercent());
    }

    public updateScale(divisionsAmount: number) {
      const validatedDivisionsAmount = this.validateDivisionsAmount(divisionsAmount);
      this.view.setScale(this.getScalePositions(validatedDivisionsAmount));
    }

    public getScalePositions(scaleDivisionsAmount: number): Map<number, number> {
      const maxAndMinDifference = this.model.getMaxValue() - this.model.getMinValue();
      const scalePositions = new Map<number, number>();
      let currentPosition = this.model.getMinValue();
      let currentPositionInPercents = 0;
      let growht = 0;
      while (growht < (maxAndMinDifference / scaleDivisionsAmount)) {
        growht += this.model.getStep();
      }
      do {
        currentPosition = this.model.validateValue(currentPosition);
        currentPositionInPercents = this.model.convertValueToPercent(currentPosition);
        scalePositions.set(currentPosition, currentPositionInPercents);
        currentPosition += growht;
      } while (currentPositionInPercents < 100);
      return scalePositions;
    }

    protected validateDivisionsAmount(divisionsAmount: number): number {
      const maxAndMinDifference = Big(this.model.getMaxValue()).minus(this.model.getMinValue());
      const stepsInRange = Number(maxAndMinDifference.div(this.model.getStep()));
      if (stepsInRange >= divisionsAmount) {
        return divisionsAmount;
      }
      return stepsInRange;
    }
}

export default SingleValueControllerHandler;
