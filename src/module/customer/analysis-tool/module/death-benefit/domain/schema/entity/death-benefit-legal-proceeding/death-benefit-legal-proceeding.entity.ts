import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitLegalProceedingId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/value-object/death-benefit-legal-proceeding-id.value-object';

import type { DeathBenefitLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/death-benefit-legal-proceeding.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

export class DeathBenefitLegalProceedingEntity extends BaseEntity<DeathBenefitLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly deathBenefitId: DeathBenefitId;

  protected readonly _type = DeathBenefitLegalProceedingEntity.name;

  public constructor(props: DeathBenefitLegalProceedingEntityPropsInterface) {
    super(DeathBenefitLegalProceedingId, props);
    this.legalProceedingNumber = props.legalProceedingNumber;
    this.deathBenefitId = props.deathBenefitId;
  }
}
