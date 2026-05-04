import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedInssBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-inss-benefit/value-object/temporary-disability-benefits-terminated-inss-benefit-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-inss-benefit/temporary-disability-benefits-terminated-inss-benefit.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedInssBenefitEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedInssBenefitEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedInssBenefitEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedInssBenefitId, props);

    this.inssBenefit = props.inssBenefit;
    this.temporaryDisabilityBenefitsTerminatedId =
      props.temporaryDisabilityBenefitsTerminatedId;
  }
}
