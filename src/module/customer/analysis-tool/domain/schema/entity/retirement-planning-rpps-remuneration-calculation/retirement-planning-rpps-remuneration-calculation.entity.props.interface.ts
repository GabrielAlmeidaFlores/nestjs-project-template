import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';

export interface RetirementPlanningRppsRemunerationCalculationEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPlanningRppsRemunerationCalculationId> {
  totalCompetencies: number;
  totalAmount: number;
  averageAmount: number;
  topEightyPercentCompetencies: number;
  bottomTwentyPercentCompetencies: number;
  topEightyPercentAverageAmount: number;
}
