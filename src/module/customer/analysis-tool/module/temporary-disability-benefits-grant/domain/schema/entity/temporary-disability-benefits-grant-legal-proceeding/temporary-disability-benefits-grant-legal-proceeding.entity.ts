import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantLegalProceedingId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/value-object/temporary-disability-benefits-grant-legal-proceeding-id.value-object';

import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/temporary-disability-benefits-grant-legal-proceeding.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantLegalProceedingEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantLegalProceedingEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantLegalProceedingEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber;
    this.temporaryDisabilityBenefitsGrantId =
      props.temporaryDisabilityBenefitsGrantId;
  }
}
