import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionIncapacityCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/value-object/retirement-permanent-disability-rejection-incapacity-cid-id/retirement-permanent-disability-rejection-incapacity-cid-id.value-object';

import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/enum/retirement-permanent-disability-rejection-incapacity-cid-type.enum';
import type { RetirementPermanentDisabilityRejectionIncapacityCidEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/retirement-permanent-disability-rejection-incapacity-cid.entity.props.interface';

export class RetirementPermanentDisabilityRejectionIncapacityCidEntity extends BaseEntity<RetirementPermanentDisabilityRejectionIncapacityCidId> {
  public readonly cid: string;
  public readonly type: RetirementPermanentDisabilityRejectionIncapacityCidTypeEnum;
  public readonly retirementPermanentDisabilityRejectionIncapacityId: RetirementPermanentDisabilityRejectionIncapacityId;

  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityCidEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionIncapacityCidEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRejectionIncapacityCidId, props);
    this.cid = props.cid;
    this.type = props.type;
    this.retirementPermanentDisabilityRejectionIncapacityId =
      props.retirementPermanentDisabilityRejectionIncapacityId;
  }
}
