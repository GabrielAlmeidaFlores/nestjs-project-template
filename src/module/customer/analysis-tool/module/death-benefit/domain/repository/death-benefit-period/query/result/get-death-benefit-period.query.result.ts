import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-category.enum';
import type { DeathBenefitPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-consideration.enum';
import type { DeathBenefitPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-pendency-reason.enum';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

export class GetDeathBenefitPeriodQueryResult extends BaseBuildableObject {
  public readonly id: DeathBenefitPeriodId;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: DeathBenefitCategoryEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: DeathBenefitPeriodPendencyReasonEnum | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean;
  public readonly periodConsideration: DeathBenefitPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly bondOrigin: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetDeathBenefitPeriodQueryResult.name;
}
