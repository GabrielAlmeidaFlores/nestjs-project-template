import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import type { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import type { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';

export interface RetirementPlanningRppsEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPlanningRppsId> {
  careerStartDate: Date;
  publicServiceStartDate: Date;
  retirementPlanningRppsResult?: RetirementPlanningRppsResultEntity | null;
  retirementPlanningRppsRemunerationCalculation?: RetirementPlanningRppsRemunerationCalculationEntity | null;
}
