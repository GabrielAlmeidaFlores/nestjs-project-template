import type { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import type { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';

export abstract class RemunerationCalculatorGateway {
  public abstract calculate(
    remunerations: RemunerationDataInputModel[],
  ): RetirementPlanningRppsRemunerationCalculationEntity;
}
