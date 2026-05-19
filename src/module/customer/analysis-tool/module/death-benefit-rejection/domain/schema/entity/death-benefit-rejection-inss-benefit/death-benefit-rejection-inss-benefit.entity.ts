import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/value-object/death-benefit-rejection-inss-benefit-id.value-object';

import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit.entity.props.interface';

export class DeathBenefitRejectionInssBenefitEntity extends BaseEntity<DeathBenefitRejectionInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly deathBenefitRejectionId: DeathBenefitRejectionId;

  protected readonly _type = DeathBenefitRejectionInssBenefitEntity.name;

  public constructor(
    props: DeathBenefitRejectionInssBenefitEntityPropsInterface,
  ) {
    super(DeathBenefitRejectionInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.deathBenefitRejectionId = props.deathBenefitRejectionId;
  }
}
