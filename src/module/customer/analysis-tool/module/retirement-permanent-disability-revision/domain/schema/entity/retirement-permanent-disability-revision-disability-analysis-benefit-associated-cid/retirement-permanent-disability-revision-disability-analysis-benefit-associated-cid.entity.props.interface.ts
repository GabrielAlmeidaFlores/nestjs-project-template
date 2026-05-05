import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid-id.value-object';

export interface RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidId> {
  retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId;
  cid: string;
}
