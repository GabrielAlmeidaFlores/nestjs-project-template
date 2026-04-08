import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

import type { DeathBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/death-benefit.entity.props.interface';
import type { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';

export class DeathBenefitEntity extends BaseEntity<DeathBenefitId> {
  public readonly analysisName: string | null;
  public readonly deathBenefitResultId: DeathBenefitResultId | null;

  protected readonly _type = DeathBenefitEntity.name;

  public constructor(props: DeathBenefitEntityPropsInterface) {
    super(DeathBenefitId, props);
    this.analysisName = props.analysisName ?? null;
    this.deathBenefitResultId = props.deathBenefitResultId ?? null;
  }
}
