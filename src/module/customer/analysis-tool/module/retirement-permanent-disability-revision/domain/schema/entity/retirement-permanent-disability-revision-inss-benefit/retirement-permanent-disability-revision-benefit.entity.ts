import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionInssBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/value-object/retirement-permanent-disability-revision-inss-benefit-id.value-object';

import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/retirement-permanent-disability-revision-inss-benefit.entity.props.interface';

export class RetirementPermanentDisabilityRevisionInssBenefitEntity extends BaseEntity<RetirementPermanentDisabilityRevisionInssBenefitId> {
  public readonly inssBenefitNumber: string;
  public readonly retirementPermanentDisabilityRevision: RetirementPermanentDisabilityRevisionId;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionInssBenefitEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionInssBenefitEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRevisionInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.retirementPermanentDisabilityRevision =
      props.retirementPermanentDisabilityRevision;
  }
}
