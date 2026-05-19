import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantInssBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/value-object/temporary-disability-benefits-grant-inss-benefit-id.value-object';

import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/temporary-disability-benefits-grant-inss-benefit.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantInssBenefitEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInssBenefitEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantInssBenefitEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.temporaryDisabilityBenefitsGrantId =
      props.temporaryDisabilityBenefitsGrantId;
  }
}
