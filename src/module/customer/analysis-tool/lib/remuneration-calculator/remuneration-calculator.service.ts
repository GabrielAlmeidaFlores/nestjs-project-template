import { Injectable } from '@nestjs/common';

import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';

@Injectable()
export class RemunerationCalculatorService implements RemunerationCalculatorGateway {
  protected readonly _type = RemunerationCalculatorService.name;

  public calculate(
    remunerations: RemunerationDataInputModel[],
  ): RetirementPlanningRppsRemunerationCalculationEntity {
    const totalCompetencies = remunerations.length;

    const totalAmount = remunerations.reduce(
      (sum, remuneration) => sum + remuneration.remunerationAmount.toNumber(),
      0,
    );

    const averageAmount =
      totalCompetencies > 0 ? totalAmount / totalCompetencies : 0;

    const sortedRemunerations = [...remunerations].sort(
      (a, b) =>
        b.remunerationAmount.toNumber() - a.remunerationAmount.toNumber(),
    );
    const eightyPercent = 0.8;
    const topEightyPercentCompetencies = Math.ceil(
      totalCompetencies * eightyPercent,
    );
    const bottomTwentyPercentCompetencies =
      totalCompetencies - topEightyPercentCompetencies;

    const topEightyPercentRemunerations = sortedRemunerations.slice(
      0,
      topEightyPercentCompetencies,
    );

    const topEightyPercentTotalAmount = topEightyPercentRemunerations.reduce(
      (sum, remuneration) => sum + remuneration.remunerationAmount.toNumber(),
      0,
    );
    const topEightyPercentAverageAmount =
      topEightyPercentCompetencies > 0
        ? topEightyPercentTotalAmount / topEightyPercentCompetencies
        : 0;

    return new RetirementPlanningRppsRemunerationCalculationEntity({
      totalCompetencies,
      totalAmount,
      averageAmount,
      topEightyPercentCompetencies,
      bottomTwentyPercentCompetencies,
      topEightyPercentAverageAmount,
    });
  }
}
