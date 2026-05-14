import type { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-period-consideration.enum';

export interface PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataInterface {
  name: string;
  cpf: string | null | undefined;
  birthDate: string | null | undefined;
  category: string | null | undefined;
  nb: string | null | undefined;
  judicialProcessNumber: string | null | undefined;
  incapacityStartDate: string | null | undefined;
}

export interface PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null | undefined;
  value: string | null | undefined;
  pendencyType: string | null | undefined;
  collectedAt: string | null | undefined;
}

export interface PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodInterface {
  bondOrigin: string | null | undefined;
  category:
    | PermanentIncapacityBenefitTerminatedCategoryEnum
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
    | PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum
    | null
    | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
  earningsHistory:
    | PermanentIncapacityBenefitTerminatedFirstAnalysisEarningsHistoryItemInterface[]
    | undefined;
}

export interface PermanentIncapacityBenefitTerminatedFirstAnalysisInterface {
  clientData: PermanentIncapacityBenefitTerminatedFirstAnalysisClientDataInterface;
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
    | PermanentIncapacityBenefitTerminatedFirstAnalysisPeriodInterface[]
    | undefined;
}
