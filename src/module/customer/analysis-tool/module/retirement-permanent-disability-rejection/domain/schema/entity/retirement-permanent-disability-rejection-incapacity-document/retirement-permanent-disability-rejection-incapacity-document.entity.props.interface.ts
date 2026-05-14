import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/enum/retirement-permanent-disability-rejection-incapacity-document-type.enum';
import type { RetirementPermanentDisabilityRejectionIncapacityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/value-object/retirement-permanent-disability-rejection-incapacity-document-id/retirement-permanent-disability-rejection-incapacity-document-id.value-object';

export interface RetirementPermanentDisabilityRejectionIncapacityDocumentEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionIncapacityDocumentId> {
  document: string;
  type: RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum;
  retirementPermanentDisabilityRejectionIncapacityId: RetirementPermanentDisabilityRejectionIncapacityId;
}
