import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import type { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import type { DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pcd-status.enum';
import type { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
import type { DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-work-type.enum';
import type { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';

export class GetDisabilityRetirementPlanningRejectionPeriodQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityRetirementPlanningRejectionPeriodId;
  public readonly bondOrigin: string | null;
  public readonly category: DisabilityRetirementPlanningRejectionPeriodCategoryEnum | null;
  public readonly activityDescription: string | null;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly workType: DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum;
  public readonly impactMonths: number | null;
  public readonly graceMonths: number | null;
  public readonly isPendency: boolean;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly contributionAverage: string | null;
  public readonly pendencyReason: DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum | null;
  public readonly periodConsideration: DisabilityRetirementPlanningRejectionPeriodConsiderationEnum | null;
  public readonly wantsToComplementViaMeuINSS: boolean | null;
  public readonly status: boolean;
  public readonly pcdStatus: DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum | null;
  public readonly local: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRejectionPeriodQueryResult.name;
}
