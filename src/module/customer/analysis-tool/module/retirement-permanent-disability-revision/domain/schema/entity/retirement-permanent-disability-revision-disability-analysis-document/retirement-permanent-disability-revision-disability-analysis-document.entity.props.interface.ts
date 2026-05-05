import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-document/value-object/retirement-permanent-disability-revision-disability-analysis-document-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/enum/retirement-permanent-disability-revision-disability-analysis-document-type.enum';

export interface RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentId> {
  retirementPermanentDisabilityRevisionDisabilityAnalysisId: RetirementPermanentDisabilityRevisionDisabilityAnalysisId;
  fileName: string;
  type: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum;
}
