import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';

import type { DeathBenefitRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity.props.interface';
import type { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/enum/death-benefit-rejection-category.enum';
import type { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

export class DeathBenefitRejectionEntity extends BaseEntity<DeathBenefitRejectionId> {
  public readonly analysisName: string | null;
  public readonly category: DeathBenefitRejectionCategoryEnum | null;
  public readonly deathBenefitRejectionResultId: DeathBenefitRejectionResultId | null;

  protected readonly _type = DeathBenefitRejectionEntity.name;

  public constructor(props: DeathBenefitRejectionEntityPropsInterface) {
    super(DeathBenefitRejectionId, props);
    this.analysisName = props.analysisName ?? null;
    this.category = props.category ?? null;
    this.deathBenefitRejectionResultId =
      props.deathBenefitRejectionResultId ?? null;
  }
}
