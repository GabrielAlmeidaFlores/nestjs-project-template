import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import type { DeathBenefitRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-consideration.enum';
import type { DeathBenefitRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-pendency-reason.enum';
import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';

export class GetDeathBenefitRejectionPeriodQueryResult extends BaseBuildableObject {
  public readonly id: DeathBenefitRejectionPeriodId;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: DeathBenefitRejectionCategoryEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: DeathBenefitRejectionPeriodPendencyReasonEnum | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean;
  public readonly periodConsideration: DeathBenefitRejectionPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly bondOrigin: string | null;
  public readonly impact: string | null;
  public readonly gracePeriod: number | null;
  public readonly complementViaMyInss: boolean | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDeathBenefitRejectionPeriodQueryResult.name;
}
