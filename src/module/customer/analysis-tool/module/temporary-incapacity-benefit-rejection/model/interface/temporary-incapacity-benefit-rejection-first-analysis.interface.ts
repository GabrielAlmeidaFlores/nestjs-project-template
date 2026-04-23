import type { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-period-consideration.enum';

export interface TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataInterface {
  name: string;
  cpf: string | null | undefined;
  birthDate: string | null | undefined;
  category: string | null | undefined;
  nb: string | null | undefined;
  judicialProcessNumber: string | null | undefined;
  incapacityStartDate: string | null | undefined;
}

export interface TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null | undefined;
  value: string | null | undefined;
  pendencyType:
    | TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum
    | null
    | undefined;
  collectedAt: string | null | undefined;
}

export interface TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodInterface {
  bondOrigin: string | null | undefined;
  category: TemporaryIncapacityBenefitRejectionCategoryEnum | null | undefined;
  activityDescription: string | null | undefined;
  startDate: string;
  endDate: string | null | undefined;
  impactMonths: number | null | undefined;
  graceMonths: number | null | undefined;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage: number | string | null | undefined;
  pendencyReason:
    | TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum
    | null
    | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
  earningsHistory:
    | TemporaryIncapacityBenefitRejectionFirstAnalysisEarningsHistoryItemInterface[]
    | undefined;
}

export interface TemporaryIncapacityBenefitRejectionFirstAnalysisInterface {
  clientData: TemporaryIncapacityBenefitRejectionFirstAnalysisClientDataInterface;
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
    | TemporaryIncapacityBenefitRejectionFirstAnalysisPeriodInterface[]
    | undefined;
}
