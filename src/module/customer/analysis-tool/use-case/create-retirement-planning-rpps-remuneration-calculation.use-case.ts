import { Inject, Injectable } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration-calculation/command/retirement-planning-rpps-remuneration-calculation.command.repository.gateway';
import { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';

interface RemunerationData {
  amount: number;
}

@Injectable()
export class CreateRetirementPlanningRppsRemunerationCalculationUseCase {
  protected readonly _type =
    CreateRetirementPlanningRppsRemunerationCalculationUseCase.name;

  public constructor(
    @Inject(
      RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway,
    )
    private readonly retirementPlanningRppsRemunerationCalculationCommandRepositoryGateway: RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway,
  ) {}

  public async execute(
    remunerations: RemunerationData[],
    existingRemunerationCalculationId: RetirementPlanningRppsRemunerationCalculationId | null,
  ): Promise<{
    transactionOperations: TransactionType[];
    entity: RetirementPlanningRppsRemunerationCalculationEntity;
  }> {
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

    const topEightyPercentCompetencies = Math.ceil(totalCompetencies * 0.8);
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

    const retirementPlanningRppsRemunerationCalculation =
      new RetirementPlanningRppsRemunerationCalculationEntity({
        id: null,
        totalCompetencies,
        totalAmount,
        averageAmount,
        topEightyPercentCompetencies,
        bottomTwentyPercentCompetencies,
        topEightyPercentAverageAmount,
      });

    const transactionOperations: TransactionType[] = [];

    if (existingRemunerationCalculationId) {
      transactionOperations.push(
        this.retirementPlanningRppsRemunerationCalculationCommandRepositoryGateway.deleteRetirementPlanningRppsRemunerationCalculation(
          existingRemunerationCalculationId,
        ),
      );
    }

    transactionOperations.push(
      this.retirementPlanningRppsRemunerationCalculationCommandRepositoryGateway.createRetirementPlanningRppsRemunerationCalculation(
        retirementPlanningRppsRemunerationCalculation,
      ),
    );

    return {
      transactionOperations,
      entity: retirementPlanningRppsRemunerationCalculation,
    };
  }
}
