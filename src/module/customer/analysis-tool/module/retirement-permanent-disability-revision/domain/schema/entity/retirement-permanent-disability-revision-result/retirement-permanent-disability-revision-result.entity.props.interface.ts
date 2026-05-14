import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';

export interface RetirementPermanentDisabilityRevisionResultEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionResultId> {
  retirementPermanentDisabilityRevisionFirstAnalysis?: string | null;
  retirementPermanentDisabilityRevisionCompleteAnalysis?: string | null;
  retirementPermanentDisabilityRevisionCompleteAnalysisDownload?: string | null;
  retirementPermanentDisabilityRevisionSimplifiedAnalysis?: string | null;
}
