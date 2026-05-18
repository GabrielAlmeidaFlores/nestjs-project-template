import type { RetirementPermanentDisabilityRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-category.enum';
import type { RetirementPermanentDisabilityRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-consideration.enum';
import type { RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-pendency-reason.enum';

export interface RetirementPermanentDisabilityRejectionFirstAnalysisClientDataInterface {
  name: string;
  cpf: string | null | undefined;
  birthDate: string | null | undefined;
  category: string | null | undefined;
  nb: string | null | undefined;
  judicialProcessNumber: string | null | undefined;
  incapacityStartDate: string | null | undefined;
}

export interface RetirementPermanentDisabilityRejectionFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null | undefined;
  value: string | null | undefined;
  pendencyType: string | null | undefined;
  collectedAt: string | null | undefined;
}

export interface RetirementPermanentDisabilityRejectionFirstAnalysisPeriodInterface {
  bondOrigin: string | null | undefined;
  category:
    | RetirementPermanentDisabilityRejectionPeriodCategoryEnum
    | null
    | undefined;
  startDate: string;
  endDate: string | null | undefined;
  impactMonths: number | null | undefined;
  graceMonths: number | null | undefined;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage: number | string | null | undefined;
  pendencyReason:
    | RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | RetirementPermanentDisabilityRejectionPeriodConsiderationEnum
    | null
    | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
  earningsHistory:
    | RetirementPermanentDisabilityRejectionFirstAnalysisEarningsHistoryItemInterface[]
    | undefined;
}

export interface RetirementPermanentDisabilityRejectionFirstAnalysisInterface {
  clientData: RetirementPermanentDisabilityRejectionFirstAnalysisClientDataInterface;
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
    | RetirementPermanentDisabilityRejectionFirstAnalysisPeriodInterface[]
    | undefined;
}
