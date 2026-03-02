import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';

export interface DisabilityRetirementPlanningResultEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningResultId> {
  disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  disabilityRetirementPlanningCompleteAnalysis?: string | null;
  disabilityRetirementPlanningSimplifiedAnalysis?: string | null;
  disabilityRetirementPlanningCompleteAnalysisDownload?: string | null;
}
