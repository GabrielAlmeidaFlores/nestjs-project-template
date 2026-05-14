import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/value-object/retirement-permanent-disability-rejection-incapacity-previous-benefit-id/retirement-permanent-disability-rejection-incapacity-previous-benefit-id.value-object';

import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/retirement-permanent-disability-rejection-incapacity-previous-benefit.entity.props.interface';

export class RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity extends BaseEntity<RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId> {
  public readonly benefitNumber: string;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly retirementPermanentDisabilityRejectionIncapacityId: RetirementPermanentDisabilityRejectionIncapacityId;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntityPropsInterface,
  ) {
    super(
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitId,
      props,
    );
    this.benefitNumber = props.benefitNumber;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.retirementPermanentDisabilityRejectionIncapacityId =
      props.retirementPermanentDisabilityRejectionIncapacityId;
  }
}
