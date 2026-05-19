import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import type { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import type { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';
import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';

export interface DisabilityRetirementPlanningGrantPeriodEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantPeriodId> {
  contributionAverage?: DecimalValue | null;
  startDate: Date;
  endDate?: Date | null;
  category: DisabilityRetirementPlanningGrantCategoryEnum;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum | null;
  typeOfContribution?: string | null;
  status: boolean;
  disabilityStatus?: DisabilityRetirementPlanningGrantDisabilityDegreeEnum | null;
  periodConsideration?: DisabilityRetirementPlanningGrantPeriodConsiderationEnum | null;
  bondOrigin?: string | null;
  disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;
}
