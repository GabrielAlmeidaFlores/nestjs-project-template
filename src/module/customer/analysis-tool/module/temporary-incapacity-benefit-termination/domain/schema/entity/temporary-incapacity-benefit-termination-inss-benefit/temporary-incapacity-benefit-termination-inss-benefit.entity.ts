import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationInssBenefitId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-inss-benefit/value-object/temporary-incapacity-benefit-termination-inss-benefit-id.value-object';

import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-inss-benefit/temporary-incapacity-benefit-termination-inss-benefit.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationInssBenefitEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationInssBenefitEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationInssBenefitEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitTerminationInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.temporaryIncapacityBenefitTerminationId =
      props.temporaryIncapacityBenefitTerminationId;
  }
}
