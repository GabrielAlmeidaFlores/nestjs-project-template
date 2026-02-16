import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/value-object/retirement-planning-rpps-result-id.value-object';

export interface RetirementPlanningRppsResultEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRppsResultId> {
  retirementPlanningRppsCompleteAnalysis?: string | null;
  retirementPlanningRppsSimplifiedAnalysis?: string | null;
}
