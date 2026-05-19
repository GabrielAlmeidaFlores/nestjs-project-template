import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/enum/retirement-permanent-disability-revision-document-type.enum';
import type { RetirementPermanentDisabilityRevisionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/value-object/retirement-permanent-disability-revision-document-id.value-object';

export interface RetirementPermanentDisabilityRevisionDocumentEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionDocumentId> {
  document: string;
  type: RetirementPermanentDisabilityRevisionDocumentTypeEnum;
  retirementPermanentDisabilityRevision: RetirementPermanentDisabilityRevisionId;
}
