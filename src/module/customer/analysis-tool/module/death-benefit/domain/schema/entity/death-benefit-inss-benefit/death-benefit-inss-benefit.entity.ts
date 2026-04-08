import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/value-object/death-benefit-inss-benefit-id.value-object';

import type { DeathBenefitInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/death-benefit-inss-benefit.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

export class DeathBenefitInssBenefitEntity extends BaseEntity<DeathBenefitInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly deathBenefitId: DeathBenefitId;

  protected readonly _type = DeathBenefitInssBenefitEntity.name;

  public constructor(props: DeathBenefitInssBenefitEntityPropsInterface) {
    super(DeathBenefitInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.deathBenefitId = props.deathBenefitId;
  }
}
