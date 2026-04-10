import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/death-benefit-grant-period.entity.props.interface';
import type { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import type { DeathBenefitGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-consideration.enum';
import type { DeathBenefitGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-pendency-reason.enum';

export class DeathBenefitGrantPeriodEntity extends BaseEntity<DeathBenefitGrantPeriodId> {
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: DeathBenefitGrantCategoryEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: DeathBenefitGrantPeriodPendencyReasonEnum | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean;
  public readonly periodConsideration: DeathBenefitGrantPeriodConsiderationEnum | null;
  public readonly bondOrigin: string | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly deathBenefitGrantId: DeathBenefitGrantId;

  protected readonly _type = DeathBenefitGrantPeriodEntity.name;

  public constructor(props: DeathBenefitGrantPeriodEntityPropsInterface) {
    super(DeathBenefitGrantPeriodId, props);
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
    this.deathBenefitGrantId = props.deathBenefitGrantId;
  }
}
