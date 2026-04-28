import type { GeneralUrbanRetirementReviewPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/general-urban-retirement-review-period-category.enum';
import type { GeneralUrbanRetirementReviewPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/general-urban-retirement-review-period-consideration.enum';
import type { GeneralUrbanRetirementReviewPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/general-urban-retirement-review-period-pendency-reason.enum';
import type { GeneralUrbanRetirementReviewPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/general-urban-retirement-review-period-work-type.enum';

export interface GeneralUrbanRetirementReviewFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null | undefined;
  value: string | null | undefined;
  pendencyType:
    | GeneralUrbanRetirementReviewPeriodPendencyReasonEnum
    | null
    | undefined;
  collectedAt: string | null | undefined;
}

export interface GeneralUrbanRetirementReviewFirstAnalysisPeriodInterface {
  bondOrigin: string | null | undefined;
  category: GeneralUrbanRetirementReviewPeriodCategoryEnum | null | undefined;
  activityDescription: string | null | undefined;
  startDate: string;
  endDate: string | null | undefined;
  workType: GeneralUrbanRetirementReviewPeriodWorkTypeEnum;
  impactMonths: number | null | undefined;
  graceMonths: number | null | undefined;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage: number | string | null | undefined;
  pendencyReason:
    | GeneralUrbanRetirementReviewPeriodPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | GeneralUrbanRetirementReviewPeriodConsiderationEnum
    | null
    | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
  earningsHistory:
    | GeneralUrbanRetirementReviewFirstAnalysisEarningsHistoryItemInterface[]
    | undefined;
}

export interface GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryScenarioInterface {
  withoutResolvingPendencies: string;
  resolvingPendencies: string;
  withTimeAccelerators: string;
}

export interface GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryInterface {
  contributionTime: GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryScenarioInterface;
  gracePeriod: GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryScenarioInterface;
}

export interface GeneralUrbanRetirementReviewFirstAnalysisClientDataInterface {
  name: string;
  cpf: string | null | undefined;
  nit: string | null | undefined;
  birthDate: string | null | undefined;
}

export interface GeneralUrbanRetirementReviewFirstAnalysisInterface {
  clientData: GeneralUrbanRetirementReviewFirstAnalysisClientDataInterface;
  timeSummary: GeneralUrbanRetirementReviewFirstAnalysisTimeSummaryInterface;
  periods:
    | GeneralUrbanRetirementReviewFirstAnalysisPeriodInterface[]
    | undefined;
}
