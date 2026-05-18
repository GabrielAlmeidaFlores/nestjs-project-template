export interface DisabilityRetirementPlanningRejectionPppAnalysisResultItemInterface {
  bondOrigin?: string;
  category: string;
  activityDescription?: string;
  startDate: string;
  endDate?: string;
  workType: string;
  impactMonths?: number;
  graceMonths?: number;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage?: string;
  pendencyReason?: string;
  periodConsideration?: string;
  wantsToComplementViaMeuINSS?: boolean;
  status: boolean;
  pcdStatus?: string;
}

export interface DisabilityRetirementPlanningRejectionPppAnalysisResultInterface {
  periods: DisabilityRetirementPlanningRejectionPppAnalysisResultItemInterface[];
}
