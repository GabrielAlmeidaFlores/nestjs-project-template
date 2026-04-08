import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-category.enum';
import type { DeathBenefitPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-consideration.enum';
import type { DeathBenefitPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/death-benefit-period.entity.props.interface';
import type { DeathBenefitPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-pendency-reason.enum';

export class DeathBenefitPeriodEntity extends BaseEntity<DeathBenefitPeriodId> {
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: DeathBenefitCategoryEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: DeathBenefitPeriodPendencyReasonEnum | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean;
  public readonly periodConsideration: DeathBenefitPeriodConsiderationEnum | null;
  public readonly bondOrigin: string | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly deathBenefitId: DeathBenefitId;

  protected readonly _type = DeathBenefitPeriodEntity.name;

  public constructor(props: DeathBenefitPeriodEntityPropsInterface) {
    super(DeathBenefitPeriodId, props);
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.category = props.category;
    this.isPendency = props.isPendency;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum;
    this.pendencyReason = props.pendencyReason ?? null;
    this.typeOfContribution = props.typeOfContribution ?? null;
    this.status = props.status;
    this.periodConsideration = props.periodConsideration ?? null;
    this.bondOrigin = props.bondOrigin ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.deathBenefitId = props.deathBenefitId;
  }
}
