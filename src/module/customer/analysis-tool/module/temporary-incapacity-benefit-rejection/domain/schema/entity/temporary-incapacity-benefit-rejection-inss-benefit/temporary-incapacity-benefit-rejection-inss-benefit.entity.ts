import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit/value-object/temporary-incapacity-benefit-rejection-inss-benefit-id.value-object';

import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit/temporary-incapacity-benefit-rejection-inss-benefit.entity.props.interface';

export class TemporaryIncapacityBenefitRejectionInssBenefitEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;

  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInssBenefitEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionInssBenefitEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitRejectionInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.temporaryIncapacityBenefitRejectionId =
      props.temporaryIncapacityBenefitRejectionId;
  }
}
