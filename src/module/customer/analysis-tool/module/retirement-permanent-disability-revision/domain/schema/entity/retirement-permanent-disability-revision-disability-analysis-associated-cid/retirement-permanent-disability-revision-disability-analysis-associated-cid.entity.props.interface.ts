import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid/value-object/retirement-permanent-disability-revision-disability-analysis-associated-cid-id.value-object';

export interface RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidId> {
  retirementPermanentDisabilityRevisionDisabilityAnalysisId: RetirementPermanentDisabilityRevisionDisabilityAnalysisId;
  cid: string;
}
