import type { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';

export interface RemunerationDataInterface {
  amount: number;
}

export abstract class RemunerationCalculatorGateway {
  public abstract calculate(
    remunerations: RemunerationDataInterface[],
  ): RetirementPlanningRppsRemunerationCalculationEntity;
}
