import Big from 'big.js';
import View from '../View/ViewComponents/View';
import Model from '../Model/Model';
import CONSTANTS from '../Utils/Constants';
import IControllerHandler from './IControllerHandler';

class RangeControllerHandler implements IControllerHandler {
    protected view: View;

    protected model: Model;

    constructor(view: View, model: Model) {
      this.view = view;
      this.model = model;
      this.view.changeModeToRange(this.model.getHighValueInPercent(), this.model.getHighValue());
    }

    // Вызывается при изменении значений бегунков в модели
    public handleValueChange(): void {
      this.updateRunnersPosition();
      this.updateTipsPositionAndText();
      this.view.setRange(this.model.getLowValueInPercent(), this.model.getHighValueInPercent());
    }

    // Вызывается при клике на шкалу или дорожку бегунка в Виде. Вычисляет ближайший к
    // данной позиции бегунок и перемещает его на данную позицию и изменяет его значение в Модели
    public handlePositionChangeByClick(data: any): void {
      const lowRunnerDifference = Math.abs(this.model.getLowValueInPercent() - data.position);
      const highRunnerDifference = Math.abs(this.model.getHighValueInPercent() - data.position);

      if (lowRunnerDifference < highRunnerDifference) {
        this.model.setLowValueByPercent(data.position);
      } else {
        this.model.setHighValueByPercent(data.position);
      }

      this.updateRunnersPosition();
      this.updateTipsPositionAndText();
      this.view.setRange(this.model.getLowValueInPercent(), this.model.getHighValueInPercent());
    }

    // Вызывается при перемещении бегунка.
    // Записывает данную позицию в Модель и перемещает бегунок на позицию.
    public handlePositionChangeByDrag(data: any): void {
      if (data.runnerIndex === 0) {
        this.model.setLowValueByPercent(data.position);
      } else if (data.runnerIndex === 1) {
        this.model.setHighValueByPercent(data.position);
      }

      this.updateRunnersPosition();
      this.updateTipsPositionAndText();
      this.view.setRange(this.model.getLowValueInPercent(), this.model.getHighValueInPercent());
    }

    // Вызывает при изменении значений maxValue и minValue в Модели
    public handleEdgeValueChange(): void {
      const scaleDivisionsAmount = this.view.getDivisionsAmount();
      this.updateScale(scaleDivisionsAmount);
      this.updateRunnersPosition();
      this.updateTipsPositionAndText();
      this.view.setRange(this.model.getLowValueInPercent(), this.model.getHighValueInPercent());
    }

    // Вызывается при изменении размеров окна браузера
    public handleResize(data: any): void {
      this.updateScale(data.scaleDivisionsAmount);
      this.updateRunnersPosition();
      this.updateTipsPositionAndText();
      this.view.setRange(this.model.getLowValueInPercent(), this.model.getHighValueInPercent());
    }

    // Вызывается при изменении шага
    public handleStepChange(): void {
      const divisionsAmount = this.view.getDivisionsAmount();
      this.updateScale(divisionsAmount);
      this.updateTipsPositionAndText();
      this.updateRunnersPosition();
    }

    public updateRunnersPosition(): void {
      this.view.setRunnerPosition(0, this.model.getLowValueInPercent());
      this.view.setRunnerPosition(1, this.model.getHighValueInPercent());
    }

    public updateTipsPositionAndText(): void {
      const isRunnersTooClose = (this.model.getHighValueInPercent()
            - this.model.getLowValueInPercent()) <= CONSTANTS.tipsJoinDistance;

      if (isRunnersTooClose) {
        this.joinTips();
      } else {
        if (!this.view.getHideStatus()) {
          this.view.showTips();
        }

        this.view.setTipText(0, this.model.getLowValue().toString());
        this.view.setTipPosition(0, this.model.getLowValueInPercent());

        this.view.setTipText(1, this.model.getHighValue().toString());
        this.view.setTipPosition(1, this.model.getHighValueInPercent());
      }
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

    // Объединяет две подсказки в одну
    protected joinTips(): void {
      this.view.hideTip(1);
      const tipText = `${this.model.getLowValue().toString()}&nbsp;&mdash;&nbsp;${this.model.getHighValue().toString()}`;
      this.view.setTipText(0, tipText);
      const tipPosition: number = this.model.getLowValueInPercent()
            + (this.model.getHighValueInPercent() - this.model.getLowValueInPercent()) / 2;
      this.view.setTipPosition(0, tipPosition);
    }

    protected validateDivisionsAmount(divisionsAmount: number): number {
      const maxAndMinDifference = Big(this.model.getMaxValue()).minus(this.model.getMinValue());
      const stepsInRange = Number(maxAndMinDifference.div(this.model.getStep())) + 1;
      if (stepsInRange >= divisionsAmount) {
        return divisionsAmount;
      }
      return stepsInRange;
    }
}

export default RangeControllerHandler;
