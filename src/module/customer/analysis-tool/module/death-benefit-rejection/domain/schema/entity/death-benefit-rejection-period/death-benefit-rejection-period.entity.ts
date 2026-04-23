import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/death-benefit-rejection-period.entity.props.interface';
import type { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import type { DeathBenefitRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-consideration.enum';
import type { DeathBenefitRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-pendency-reason.enum';

export class DeathBenefitRejectionPeriodEntity extends BaseEntity<DeathBenefitRejectionPeriodId> {
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: DeathBenefitRejectionCategoryEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: DeathBenefitRejectionPeriodPendencyReasonEnum | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean;
  public readonly periodConsideration: DeathBenefitRejectionPeriodConsiderationEnum | null;
  public readonly bondOrigin: string | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly impact: string | null;
  public readonly gracePeriod: number | null;
  public readonly complementViaMyInss: boolean | null;
  public readonly deathBenefitRejectionId: DeathBenefitRejectionId;

  protected readonly _type = DeathBenefitRejectionPeriodEntity.name;

  public constructor(props: DeathBenefitRejectionPeriodEntityPropsInterface) {
    super(DeathBenefitRejectionPeriodId, props);
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
    this.impact = props.impact ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.complementViaMyInss = props.complementViaMyInss ?? null;
    this.deathBenefitRejectionId = props.deathBenefitRejectionId;
  }
}
