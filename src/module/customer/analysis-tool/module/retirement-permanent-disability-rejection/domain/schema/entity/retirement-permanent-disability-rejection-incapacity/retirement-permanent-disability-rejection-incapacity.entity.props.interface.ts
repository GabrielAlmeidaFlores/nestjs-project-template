import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionSeriousDiseaseEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/enum/retirement-permanent-disability-rejection-serious-disease.enum';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';

export interface RetirementPermanentDisabilityRejectionIncapacityEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionIncapacityId> {
  incapacityStartDate?: Date | null;
  diseaseDescription?: string | null;
  isIncapacityFromAccident: boolean;
  incapacitatingEventDescription?: string | null;
  isIncapacityFromSeriousDisease: boolean;
  seriousDiseaseType?: RetirementPermanentDisabilityRejectionSeriousDiseaseEnum | null;
  seriousDiseaseOtherDescription?: string | null;
  seriousDiseaseStartDate?: Date | null;
  needsPermanentAssistance: boolean;
  hasPreviousIncapacityBenefit: boolean;
}
