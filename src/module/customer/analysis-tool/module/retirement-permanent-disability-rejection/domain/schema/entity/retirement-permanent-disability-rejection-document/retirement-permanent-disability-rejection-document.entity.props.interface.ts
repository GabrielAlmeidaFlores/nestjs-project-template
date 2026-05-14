import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/enum/retirement-permanent-disability-rejection-document-type.enum';
import type { RetirementPermanentDisabilityRejectionDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/value-object/retirement-permanent-disability-rejection-document-id/retirement-permanent-disability-rejection-document-id.value-object';

export interface RetirementPermanentDisabilityRejectionDocumentEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionDocumentId> {
  document: string;
  type: RetirementPermanentDisabilityRejectionDocumentTypeEnum;
  retirementPermanentDisabilityRejectionId: RetirementPermanentDisabilityRejectionId;
}
