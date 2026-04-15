import type { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import type { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import type { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';

export interface GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null;
  value: string | null;
}

export interface GeneralUrbanRetirementDenialFirstAnalysisPeriodInterface {
  name: string;
  startDate: string;
  endDate: string | null;
  category: string | null;
  workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  pendencyReason: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum | null;
  impact: string | null;
  periodConsideration: GeneralUrbanRetirementDenialPeriodConsiderationEnum | null;
  contributionAverage: number | string | null;
  earningsHistory: GeneralUrbanRetirementDenialFirstAnalysisEarningsHistoryItemInterface[];
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
  cpf: string | null;
  nit: string | null;
  birthDate: string | null;
}

export interface GeneralUrbanRetirementDenialFirstAnalysisInterface {
  clientData: GeneralUrbanRetirementDenialFirstAnalysisClientDataInterface;
  timeSummary: GeneralUrbanRetirementDenialFirstAnalysisTimeSummaryInterface;
  periods: GeneralUrbanRetirementDenialFirstAnalysisPeriodInterface[];
}
