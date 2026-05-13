import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/value-object/retirement-permanent-disability-revision-legal-proceeding-id.value-object';

import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/retirement-permanent-disability-revision-legal-proceeding.entity.props.interface';

export class RetirementPermanentDisabilityRevisionLegalProceedingEntity extends BaseEntity<RetirementPermanentDisabilityRevisionLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionLegalProceedingEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionLegalProceedingEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRevisionLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.retirementPermanentDisabilityRevisionId =
      props.retirementPermanentDisabilityRevisionId;
  }
}
