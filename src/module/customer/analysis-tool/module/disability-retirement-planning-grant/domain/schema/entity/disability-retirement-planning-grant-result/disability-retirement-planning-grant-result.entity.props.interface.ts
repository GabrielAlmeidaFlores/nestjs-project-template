import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

export interface DisabilityRetirementPlanningGrantResultEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantResultId> {
  disabilityRetirementPlanningGrantCompleteAnalysis?: string | null;
  disabilityRetirementPlanningGrantSimplifiedAnalysis?: string | null;
  disabilityRetirementPlanningGrantFirstAnalysis?: string | null;
  disabilityRetirementPlanningGrantCompleteAnalysisDownload?: string | null;
}
