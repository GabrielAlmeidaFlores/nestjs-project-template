import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/enum/retirement-permanent-disability-rejection-category.enum';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import type { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';

export interface RetirementPermanentDisabilityRejectionEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionId> {
  analysisName?: string | null;
  requestEntryDate?: Date | null;
  denialDate?: Date | null;
  category?: RetirementPermanentDisabilityRejectionCategoryEnum | null;
  retirementPermanentDisabilityRejectionResultId?: RetirementPermanentDisabilityRejectionResultId | null;
  retirementPermanentDisabilityRejectionIncapacityId?: RetirementPermanentDisabilityRejectionIncapacityId | null;
  retirementPermanentDisabilityRejectionInsuredQualityId?: RetirementPermanentDisabilityRejectionInsuredQualityId | null;
}
