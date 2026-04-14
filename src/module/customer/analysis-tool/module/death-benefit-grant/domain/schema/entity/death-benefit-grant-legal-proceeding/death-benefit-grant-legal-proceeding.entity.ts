import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/value-object/death-benefit-grant-legal-proceeding-id.value-object';

import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.entity.props.interface';

export class DeathBenefitGrantLegalProceedingEntity extends BaseEntity<DeathBenefitGrantLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly deathBenefitGrantId: DeathBenefitGrantId;

  protected readonly _type = DeathBenefitGrantLegalProceedingEntity.name;

  public constructor(
    props: DeathBenefitGrantLegalProceedingEntityPropsInterface,
  ) {
    super(DeathBenefitGrantLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber;
    this.deathBenefitGrantId = props.deathBenefitGrantId;
  }
}
