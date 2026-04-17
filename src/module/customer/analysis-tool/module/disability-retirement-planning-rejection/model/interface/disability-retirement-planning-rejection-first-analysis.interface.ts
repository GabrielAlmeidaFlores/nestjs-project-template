import type { DisabilityRetirementPlanningRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-category.enum';
import type { DisabilityRetirementPlanningRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-consideration.enum';
import type { DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-pendency-reason.enum';
import type { DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/enum/disability-retirement-planning-rejection-period-work-type.enum';

export interface DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null | undefined;
  value: string | null | undefined;
  pendencyType:
    | DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum
    | null
    | undefined;
  collectedAt: string | null | undefined;
}

export interface DisabilityRetirementPlanningRejectionFirstAnalysisPeriodInterface {
  bondOrigin: string | null | undefined;
  category:
    | DisabilityRetirementPlanningRejectionPeriodCategoryEnum
    | null
    | undefined;
  activityDescription: string | null | undefined;
  startDate: string;
  endDate: string | null | undefined;
  workType: DisabilityRetirementPlanningRejectionPeriodWorkTypeEnum;
  impactMonths: number | null | undefined;
  graceMonths: number | null | undefined;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage: number | string | null | undefined;
  pendencyReason:
    | DisabilityRetirementPlanningRejectionPeriodPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | DisabilityRetirementPlanningRejectionPeriodConsiderationEnum
    | null
    | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
  earningsHistory:
    | DisabilityRetirementPlanningRejectionFirstAnalysisEarningsHistoryItemInterface[]
    | undefined;
}

export interface DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioInterface {
  withoutResolvingPendencies: string;
  resolvingPendencies: string;
  withTimeAccelerators: string;
}

export interface DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryInterface {
  contributionTime: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioInterface;
  gracePeriod: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryScenarioInterface;
}

export interface DisabilityRetirementPlanningRejectionFirstAnalysisClientDataInterface {
  name: string;
  cpf: string | null | undefined;
  nit: string | null | undefined;
  birthDate: string | null | undefined;
}

export interface DisabilityRetirementPlanningRejectionFirstAnalysisInterface {
  clientData: DisabilityRetirementPlanningRejectionFirstAnalysisClientDataInterface;
  timeSummary: DisabilityRetirementPlanningRejectionFirstAnalysisTimeSummaryInterface;
  periods:
    | DisabilityRetirementPlanningRejectionFirstAnalysisPeriodInterface[]
    | undefined;
}
