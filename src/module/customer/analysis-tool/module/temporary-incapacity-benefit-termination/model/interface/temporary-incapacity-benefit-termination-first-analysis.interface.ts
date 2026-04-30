import type { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-pendency-reason.enum';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-period-consideration.enum';

export interface TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataInterface {
  name: string;
  cpf: string | null | undefined;
  birthDate: string | null | undefined;
  category: string | null | undefined;
  nb: string | null | undefined;
  judicialProcessNumber: string | null | undefined;
  incapacityStartDate: string | null | undefined;
}

export interface TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null | undefined;
  value: string | null | undefined;
  pendencyType:
    | TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum
    | null
    | undefined;
  collectedAt: string | null | undefined;
}

export interface TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodInterface {
  bondOrigin: string | null | undefined;
  category:
    | TemporaryIncapacityBenefitTerminationCategoryEnum
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
    | TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum
    | null
    | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
  earningsHistory:
    | TemporaryIncapacityBenefitTerminationFirstAnalysisEarningsHistoryItemInterface[]
    | undefined;
}

export interface TemporaryIncapacityBenefitTerminationFirstAnalysisInterface {
  clientData: TemporaryIncapacityBenefitTerminationFirstAnalysisClientDataInterface;
  insuredStatus: boolean;
  gracePeriodStatus: string;
  gracePeriods: Array<{
    event: string;
    date: string;
    observation: string;
  }>;
  analysisConclusion: string;
  graceExtensionDueToInvoluntaryUnemployment: boolean;
  requestToExtendGracePeriod: boolean;
  graceExempt: boolean;
  graceValidation: string;
  contributionTimeWithoutResolvingPendencies: string;
  contributionTimeResolvingPendencies: string;
  contributionTimeWithAccelerators: string;
  periods:
    | TemporaryIncapacityBenefitTerminationFirstAnalysisPeriodInterface[]
    | undefined;
}
