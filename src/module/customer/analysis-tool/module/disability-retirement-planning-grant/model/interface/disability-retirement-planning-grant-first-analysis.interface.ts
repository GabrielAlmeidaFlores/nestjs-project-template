import type { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import type { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import type { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';

export interface DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemInterface {
  contributionDate: string;
  contributionValue: string;
}

export interface DisabilityRetirementPlanningGrantFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null;
  remuneration: string | null;
  indicators: string | null;
  paymentDate: string | null;
  contribution: string | null;
  contributionSalary: string | null;
  analysis: string | null;
  competenceBelowTheMinimum: boolean | null;
}

export interface DisabilityRetirementPlanningGrantFirstAnalysisPeriodInterface {
  name: string;
  startDate: string;
  endDate: string;
  category: DisabilityRetirementPlanningGrantCategoryEnum;
  gracePeriod: number;
  statusPCD?: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;
  status: boolean;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage?: number | string | null;
  belowMinimumContributions:
    | DisabilityRetirementPlanningGrantFirstAnalysisBelowMinimumContributionItemInterface[]
    | null;
  earningsHistory: DisabilityRetirementPlanningGrantFirstAnalysisEarningsHistoryItemInterface[];
  reasonPendency?: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum;
  bondOrigin?: string | null;
}

export interface DisabilityRetirementPlanningGrantFirstAnalysisDocumentInterface {
  documentName: string;
  viability: 'alta_viabilidade' | 'media_viabilidade' | 'baixa_viabilidade';
  cid: string;
  degree: string;
  date: string;
  crm: string;
  observations: string[];
}

export interface DisabilityRetirementPlanningGrantFirstAnalysisSummaryTableInterface {
  timeAsDisabledWithoutResolvingPendencies: string;
  timeAsDisabledResolvingPendencies: string;
  timeAsDisabledWithAccelerators: string;
  commonTimeWithoutResolvingPendencies: string;
  commonTimeResolvingPendencies: string;
  commonTimeWithAccelerators: string;
  totalTimeWithoutResolvingPendencies: string;
  totalTimeResolvingPendencies: string;
  totalTimeWithAccelerators: string;
  gracePeriodAsDisabledWithoutResolvingPendencies: string;
  gracePeriodAsDisabledResolvingPendencies: string;
  gracePeriodAsDisabledWithAccelerators: string;
  commonGracePeriodWithoutResolvingPendencies: string;
  commonGracePeriodResolvingPendencies: string;
  commonGracePeriodWithAccelerators: string;
  totalGracePeriodWithoutResolvingPendencies: string;
  totalGracePeriodResolvingPendencies: string;
  totalGracePeriodWithAccelerators: string;
}

export interface DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisInterface {
  predominantDisabilityDegree: string;
  lightDisabilityPercentage: number;
  moderateDisabilityPercentage: number;
  severeDisabilityPercentage: number;
  summaryTable: DisabilityRetirementPlanningGrantFirstAnalysisSummaryTableInterface | null;
  documents:
    | DisabilityRetirementPlanningGrantFirstAnalysisDocumentInterface[]
    | null;
}

export interface DisabilityRetirementPlanningGrantFirstAnalysisInterface {
  periods: DisabilityRetirementPlanningGrantFirstAnalysisPeriodInterface[];
  disabilityAnalysis: DisabilityRetirementPlanningGrantFirstAnalysisDisabilityAnalysisInterface;
}
