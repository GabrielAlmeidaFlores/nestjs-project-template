import type { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import type { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import type { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import type { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';

export interface GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null | undefined;
  value: string | null | undefined;
  pendencyType:
    | GeneralUrbanRetirementDenialPeriodPendencyReasonEnum
    | null
    | undefined;
  collectedAt: string | null | undefined;
}

export interface GeneralUrbanRetirementDenialFirstAnalysisPeriodInterface {
  bondOrigin: string | null | undefined;
  category: GeneralUrbanRetirementDenialPeriodCategoryEnum | null | undefined;
  activityDescription: string | null | undefined;
  startDate: string;
  endDate: string | null | undefined;
  workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;
  impactMonths: number | null | undefined;
  graceMonths: number | null | undefined;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage: number | string | { value: string } | null | undefined;
  pendencyReason:
    | GeneralUrbanRetirementDenialPeriodPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | GeneralUrbanRetirementDenialPeriodConsiderationEnum
    | null
    | undefined;
  shouldConsiderLastRemunerationAsExitDate: boolean | null | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
  earningsHistory:
    | GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemInterface[]
    | undefined;
}

export interface GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioInterface {
  withoutResolvingPendencies: string;
  resolvingPendencies: string;
  withTimeAccelerators: string;
}

export interface GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryInterface {
  contributionTime: GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioInterface;
  gracePeriod: GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryScenarioInterface;
}

export interface GeneralUrbanRetirementDenialFirstAnalysisClientDataInterface {
  name: string;
  cpf: string | null | undefined;
  nit: string | null | undefined;
  birthDate: string | null | undefined;
}

export interface GeneralUrbanRetirementDenialFirstAnalysisInterface {
  clientData: GeneralUrbanRetirementDenialFirstAnalysisClientDataInterface;
  timeSummary: GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryInterface;
  periods:
    | GeneralUrbanRetirementDenialFirstAnalysisPeriodInterface[]
    | undefined;
}
