import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/value-object/retirement-permanent-disability-rejection-incapacity-previous-benefit-id/retirement-permanent-disability-rejection-incapacity-previous-benefit-id.value-object';

export interface RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId> {
  benefitNumber: string;
  startDate?: Date | null;
  endDate?: Date | null;
  retirementPermanentDisabilityRejectionIncapacityId: RetirementPermanentDisabilityRejectionIncapacityId;
}
