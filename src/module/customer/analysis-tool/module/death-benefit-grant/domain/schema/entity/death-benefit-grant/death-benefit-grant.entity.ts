import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';

import type { DeathBenefitGrantEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity.props.interface';
import type { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';

export class DeathBenefitGrantEntity extends BaseEntity<DeathBenefitGrantId> {
  public readonly analysisName: string | null;
  public readonly deathBenefitGrantResultId: DeathBenefitGrantResultId | null;

  protected readonly _type = DeathBenefitGrantEntity.name;

  public constructor(props: DeathBenefitGrantEntityPropsInterface) {
    super(DeathBenefitGrantId, props);
    this.analysisName = props.analysisName ?? null;
    this.deathBenefitGrantResultId = props.deathBenefitGrantResultId ?? null;
  }
}
