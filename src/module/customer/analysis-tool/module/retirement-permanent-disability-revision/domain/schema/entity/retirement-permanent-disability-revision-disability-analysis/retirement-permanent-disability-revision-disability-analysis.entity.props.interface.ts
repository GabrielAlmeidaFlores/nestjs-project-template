import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';

export interface RetirementPermanentDisabilityRevisionDisabilityAnalysisEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionDisabilityAnalysisId> {
  retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;
  estimatedIncapacityStartDate?: Date | null;
  medicalDescription?: string | null;
  isAccidentRelated?: boolean | null;
  accidentDescription?: string | null;
  isSevereDisease?: boolean | null;
  severeDiseaseType?: string | null;
  severeDiseaseName?: string | null;
  diseaseStartDate?: Date | null;
  needsPermanentAssistance?: boolean | null;
}
