import type { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-pendency-reason.enum';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/enum/temporary-disability-benefits-terminated-work-periods-period-consideration.enum';

export interface TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataInterface {
  name: string;
  cpf: string | null | undefined;
  birthDate: string | null | undefined;
  category: string | null | undefined;
  nb: string | null | undefined;
  judicialProcessNumber: string | null | undefined;
  incapacityStartDate: string | null | undefined;
}

export interface TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null | undefined;
  value: string | null | undefined;
  pendencyType:
    | TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum
    | null
    | undefined;
  collectedAt: string | null | undefined;
}

export interface TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodInterface {
  bondOrigin: string | null | undefined;
  category:
    | TemporaryDisabilityBenefitsTerminatedCategoryEnum
    | null
    | undefined;
  activityDescription: string | null | undefined;
  startDate: string;
  endDate: string | null | undefined;
  impactMonths: number | null | undefined;
  graceMonths: number | null | undefined;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage: number | string | null | undefined;
  pendencyReason:
    | TemporaryDisabilityBenefitsTerminatedWorkPeriodsPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | TemporaryDisabilityBenefitsTerminatedWorkPeriodsPeriodConsiderationEnum
    | null
    | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
  earningsHistory:
    | TemporaryDisabilityBenefitsTerminatedFirstAnalysisEarningsHistoryItemInterface[]
    | undefined;
}

export interface TemporaryDisabilityBenefitsTerminatedFirstAnalysisInterface {
  clientData: TemporaryDisabilityBenefitsTerminatedFirstAnalysisClientDataInterface;
  insuredStatus: boolean;
  gracePeriodStatus: string;
  gracePeriods: Array<{
    event: string;
    date: string;
    observation: string;
  }>;
  analysisConclusion: string;
  manteinedInsuredQuality: boolean;
  graceExtensionDueToInvoluntaryUnemployment: boolean;
  requestToExtendGracePeriod: boolean;
  graceExempt: boolean;
  graceValidation: string;
  contributionTimeWithoutResolvingPendencies: string;
  contributionTimeResolvingPendencies: string;
  contributionTimeWithAccelerators: string;
  periods:
    | TemporaryDisabilityBenefitsTerminatedFirstAnalysisPeriodInterface[]
    | undefined;
}
