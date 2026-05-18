import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import type { RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/enum/retirement-permanent-disability-rejection-insured-quality-document-type.enum';
import type { RetirementPermanentDisabilityRejectionInsuredQualityDocumentId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/value-object/retirement-permanent-disability-rejection-insured-quality-document-id/retirement-permanent-disability-rejection-insured-quality-document-id.value-object';

export interface RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionInsuredQualityDocumentId> {
  document: string;
  type: RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum;
  retirementPermanentDisabilityRejectionInsuredQualityId: RetirementPermanentDisabilityRejectionInsuredQualityId;
}
