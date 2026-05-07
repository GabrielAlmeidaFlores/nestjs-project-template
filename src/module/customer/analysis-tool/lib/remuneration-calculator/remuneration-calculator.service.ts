import { Injectable } from '@nestjs/common';

import { ipcaData } from '@lib/cnis-analyzer/data/ipca';
import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculationOutputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/output/remuneration-calculation.output.model';
import { RemunerationDetailOutputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/output/remuneration-detail.output.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';

@Injectable()
export class RemunerationCalculatorService implements RemunerationCalculatorGateway {
  protected readonly _type = RemunerationCalculatorService.name;

  private readonly correctionFactorMap = new Map(
    ipcaData.map((item) => [item.competencia, item.fatorSimplificado]),
  );

  public calculateRemuneration(
    remuneration: RemunerationDataInputModel,
  ): RemunerationDetailOutputModel {
    const remunerationAmount = remuneration.remunerationAmount.toNumber();
    const correctionFactor = this.getCorrectionFactor(
      remuneration.remunerationDate,
    );
    const updatedRemunerationAmount = Number(
      (remunerationAmount * correctionFactor).toFixed(2),
    );

    return RemunerationDetailOutputModel.build({
      remunerationDate: remuneration.remunerationDate,
      remunerationAmount,
      correctionFactor,
      updatedRemunerationAmount,
    });
  }

  public calculate(
    remunerations: RemunerationDataInputModel[],
  ): RemunerationCalculationOutputModel {
    const remunerationDetails = remunerations.map((remuneration) =>
      this.calculateRemuneration(remuneration),
    );
    const totalCompetencies = remunerations.length;

    const totalAmount = remunerationDetails.reduce(
      (sum, remuneration) => sum + remuneration.remunerationAmount,
      0,
    );
    const totalUpdatedAmount = remunerationDetails.reduce(
      (sum, remuneration) => sum + remuneration.updatedRemunerationAmount,
      0,
    );

    const averageAmount =
      totalCompetencies > 0 ? totalAmount / totalCompetencies : 0;
    const averageUpdatedAmount =
      totalCompetencies > 0 ? totalUpdatedAmount / totalCompetencies : 0;

    const sortedOriginalRemunerations = [...remunerationDetails].sort(
      (a, b) => b.remunerationAmount - a.remunerationAmount,
    );
    const sortedUpdatedRemunerations = [...remunerationDetails].sort(
      (a, b) => b.updatedRemunerationAmount - a.updatedRemunerationAmount,
    );
    const eightyPercent = 0.8;
    const topEightyPercentCompetencies = Math.ceil(
      totalCompetencies * eightyPercent,
    );
    const bottomTwentyPercentCompetencies =
      totalCompetencies - topEightyPercentCompetencies;

    const topEightyPercentOriginalRemunerations =
      sortedOriginalRemunerations.slice(0, topEightyPercentCompetencies);
    const topEightyPercentUpdatedRemunerations =
      sortedUpdatedRemunerations.slice(0, topEightyPercentCompetencies);

    const topEightyPercentTotalAmount =
      topEightyPercentOriginalRemunerations.reduce(
        (sum, remuneration) => sum + remuneration.remunerationAmount,
        0,
      );
    const topEightyPercentTotalUpdatedAmount =
      topEightyPercentUpdatedRemunerations.reduce(
        (sum, remuneration) => sum + remuneration.updatedRemunerationAmount,
        0,
      );
    const topEightyPercentAverageAmount =
      topEightyPercentCompetencies > 0
        ? topEightyPercentTotalAmount / topEightyPercentCompetencies
        : 0;
    const topEightyPercentAverageUpdatedAmount =
      topEightyPercentCompetencies > 0
        ? topEightyPercentTotalUpdatedAmount / topEightyPercentCompetencies
        : 0;

    return RemunerationCalculationOutputModel.build({
      totalCompetencies,
      totalAmount: Number(totalAmount.toFixed(2)),
      totalUpdatedAmount: Number(totalUpdatedAmount.toFixed(2)),
      averageAmount: Number(averageAmount.toFixed(2)),
      averageUpdatedAmount: Number(averageUpdatedAmount.toFixed(2)),
      topEightyPercentCompetencies,
      bottomTwentyPercentCompetencies,
      topEightyPercentAverageAmount: Number(
        topEightyPercentAverageAmount.toFixed(2),
      ),
      topEightyPercentAverageUpdatedAmount: Number(
        topEightyPercentAverageUpdatedAmount.toFixed(2),
      ),
    });
  }

  private getCompetence(remunerationDate: Date): string {
    const month = String(remunerationDate.getMonth() + 1).padStart(2, '0');
    const year = remunerationDate.getFullYear();

    return `${month}/${year}`;
  }

  private getCorrectionFactor(remunerationDate: Date): number {
    return (
      this.correctionFactorMap.get(this.getCompetence(remunerationDate)) ?? 1
    );
  }
}
