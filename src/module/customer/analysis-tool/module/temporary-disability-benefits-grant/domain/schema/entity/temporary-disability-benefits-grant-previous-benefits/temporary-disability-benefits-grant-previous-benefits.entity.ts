import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';

import type { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantPreviousBenefitsId> {
  public readonly benefitNumber: string;
  public readonly temporaryDisabilityBenefitsGrantPeriodId: TemporaryDisabilityBenefitsGrantPeriodId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantPreviousBenefitsEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantPreviousBenefitsId, props);
    this.benefitNumber = props.benefitNumber;
    this.temporaryDisabilityBenefitsGrantPeriodId =
      props.temporaryDisabilityBenefitsGrantPeriodId;
  }
}
