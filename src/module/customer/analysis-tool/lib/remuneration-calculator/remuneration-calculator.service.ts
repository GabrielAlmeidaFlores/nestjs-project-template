import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import {
  RemunerationCalculatorGateway,
  RemunerationDataInterface,
} from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';

@Injectable()
export class RemunerationCalculatorService implements RemunerationCalculatorGateway {
  protected readonly _type = RemunerationCalculatorService.name;

  public calculate(
    remunerations: RemunerationDataInterface[],
  ): RetirementPlanningRppsRemunerationCalculationEntity {
    const totalCompetencies = remunerations.length;

    const totalAmount = remunerations.reduce(
      (sum, remuneration) => sum + remuneration.amount,
      0,
    );

    const averageAmount =
      totalCompetencies > 0 ? totalAmount / totalCompetencies : 0;

    const sortedRemunerations = [...remunerations].sort(
      (a, b) => b.amount - a.amount,
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
      (sum, remuneration) => sum + remuneration.amount,
      0,
    );
    const topEightyPercentAverageAmount =
      topEightyPercentCompetencies > 0
        ? topEightyPercentTotalAmount / topEightyPercentCompetencies
        : 0;

    return new RetirementPlanningRppsRemunerationCalculationEntity({
      id: null,
      totalCompetencies,
      totalAmount,
      averageAmount,
      topEightyPercentCompetencies,
      bottomTwentyPercentCompetencies,
      topEightyPercentAverageAmount,
    });
  }
}
