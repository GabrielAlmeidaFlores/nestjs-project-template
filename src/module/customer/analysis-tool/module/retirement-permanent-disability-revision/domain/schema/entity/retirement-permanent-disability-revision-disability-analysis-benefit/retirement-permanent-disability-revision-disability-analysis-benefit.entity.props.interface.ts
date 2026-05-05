import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-id.value-object';

export interface RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId> {
  retirementPermanentDisabilityRevisionDisabilityAnalysisId: RetirementPermanentDisabilityRevisionDisabilityAnalysisId;
  hasPreviousBenefit: boolean;
  benefitNumber?: string | null;
  benefitStartDate?: Date | null;
  benefitEndDate?: Date | null;
}
