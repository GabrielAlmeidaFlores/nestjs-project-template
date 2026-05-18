export interface TeacherRetirementPlanningRejectionPppAnalysisResultItemInterface {
  bondOrigin?: string;
  category?: string;
  activityDescription?: string;
  startDate: string;
  endDate?: string;
  impactMonths?: number;
  graceMonths?: number;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage?: string;
  pendencyReason?: string;
  periodConsideration?: string;
  wantsToComplementViaMeuINSS?: boolean;
  status: boolean;
  hasSpecialPeriod?: boolean;
  timelineClassification?: string;
}

export interface TeacherRetirementPlanningRejectionPppAnalysisResultInterface {
  periods: TeacherRetirementPlanningRejectionPppAnalysisResultItemInterface[];
}
