import type { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import type { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import type { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import type { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';

export interface DisabilityRetirementPlanningGrantPppAnalysisResultItemInterface {
  startDate: string;
  endDate: string | null;
  category: DisabilityRetirementPlanningGrantCategoryEnum;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  pendencyReason: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum | null;
  typeOfContribution: string | null;
  status: boolean;
  contributionAverage: string | null;
  disabilityStatus: DisabilityRetirementPlanningGrantDisabilityDegreeEnum | null;
  periodConsideration: DisabilityRetirementPlanningGrantPeriodConsiderationEnum | null;
  bondOrigin: string | null;
}

export interface DisabilityRetirementPlanningGrantPppAnalysisResultInterface {
  periods: DisabilityRetirementPlanningGrantPppAnalysisResultItemInterface[];
}
