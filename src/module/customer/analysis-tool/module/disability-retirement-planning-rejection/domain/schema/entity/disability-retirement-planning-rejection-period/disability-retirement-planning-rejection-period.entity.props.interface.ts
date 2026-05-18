import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import type { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import type { DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pcd-status.enum';
import type { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
import type { DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-work-type.enum';
import type { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';

export interface DisabilityRetirementPlanningRejectionPeriodEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningRejectionPeriodId> {
  bondOrigin?: string | null;
  category?: DisabilityRetirementPlanningRejectionPeriodCategoryEnum | null;
  activityDescription?: string | null;
  startDate: Date;
  endDate?: Date | null;
  workType: DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum;
  impactMonths?: number | null;
  graceMonths?: number | null;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage?: DecimalValue | null;
  pendencyReason?: DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum | null;
  periodConsideration?: DisabilityRetirementPlanningRejectionPeriodConsiderationEnum | null;
  wantsToComplementViaMeuINSS?: boolean | null;
  status: boolean;
  pcdStatus?: DisabilityRetirementPlanningRejectionPeriodPcdStatusEnum | null;
  local?: string | null;
  disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId;
}
