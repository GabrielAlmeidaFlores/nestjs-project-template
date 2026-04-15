import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/value-object/death-benefit-grant-inss-benefit-id.value-object';

import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity.props.interface';

export class DeathBenefitGrantInssBenefitEntity extends BaseEntity<DeathBenefitGrantInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly deathBenefitGrantId: DeathBenefitGrantId;

  protected readonly _type = DeathBenefitGrantInssBenefitEntity.name;

  public constructor(props: DeathBenefitGrantInssBenefitEntityPropsInterface) {
    super(DeathBenefitGrantInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.deathBenefitGrantId = props.deathBenefitGrantId;
  }
}
