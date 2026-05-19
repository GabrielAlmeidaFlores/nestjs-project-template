import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import type { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import type { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import type { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';
import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';

export class GetDisabilityRetirementPlanningGrantPeriodQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityRetirementPlanningGrantPeriodId;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: DisabilityRetirementPlanningGrantCategoryEnum;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum | null;
  public readonly typeOfContribution: string | null;
  public readonly status: boolean;
  public readonly disabilityStatus: DisabilityRetirementPlanningGrantDisabilityDegreeEnum | null;
  public readonly periodConsideration: DisabilityRetirementPlanningGrantPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly bondOrigin: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantPeriodQueryResult.name;
}
