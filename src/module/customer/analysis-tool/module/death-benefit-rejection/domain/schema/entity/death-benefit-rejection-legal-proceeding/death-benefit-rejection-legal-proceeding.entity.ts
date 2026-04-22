import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/value-object/death-benefit-rejection-legal-proceeding-id.value-object';

import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/death-benefit-rejection-legal-proceeding.entity.props.interface';

export class DeathBenefitRejectionLegalProceedingEntity extends BaseEntity<DeathBenefitRejectionLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly deathBenefitRejectionId: DeathBenefitRejectionId;

  protected readonly _type = DeathBenefitRejectionLegalProceedingEntity.name;

  public constructor(
    props: DeathBenefitRejectionLegalProceedingEntityPropsInterface,
  ) {
    super(DeathBenefitRejectionLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber;
    this.deathBenefitRejectionId = props.deathBenefitRejectionId;
  }
}
