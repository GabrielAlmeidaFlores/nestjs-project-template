import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import type { DeathBenefitGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-consideration.enum';
import type { DeathBenefitGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-pendency-reason.enum';
import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

export class GetDeathBenefitGrantPeriodQueryResult extends BaseBuildableObject {
  public readonly id: DeathBenefitGrantPeriodId;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: DeathBenefitGrantCategoryEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: DeathBenefitGrantPeriodPendencyReasonEnum | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean;
  public readonly periodConsideration: DeathBenefitGrantPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly bondOrigin: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDeathBenefitGrantPeriodQueryResult.name;
}
