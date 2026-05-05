export interface TeacherRetirementPlanningRejectionFirstAnalysisTimeMetricInterface {
  withoutResolvingPendencies: string;
  resolvingPendencies: string;
  withAccelerators: string;
}

export interface TeacherRetirementPlanningRejectionFirstAnalysisGracePeriodMetricInterface {
  withoutResolvingPendencies: number;
  resolvingPendencies: number;
  withAccelerators: number;
}

export interface TeacherRetirementPlanningRejectionFirstAnalysisSummaryInterface {
  specialTime: TeacherRetirementPlanningRejectionFirstAnalysisTimeMetricInterface;
  commonTime: TeacherRetirementPlanningRejectionFirstAnalysisTimeMetricInterface;
  totalTime: TeacherRetirementPlanningRejectionFirstAnalysisTimeMetricInterface;
  specialGracePeriod: TeacherRetirementPlanningRejectionFirstAnalysisGracePeriodMetricInterface;
  commonGracePeriod: TeacherRetirementPlanningRejectionFirstAnalysisGracePeriodMetricInterface;
  totalGracePeriod: TeacherRetirementPlanningRejectionFirstAnalysisGracePeriodMetricInterface;
}

export interface TeacherRetirementPlanningRejectionFirstAnalysisEarningsHistoryInterface {
  competence: string | null;
  remuneration: string | null;
  indicators: string | null;
  paymentDate: string | null;
  contribution: string | null;
  contributionSalary: string | null;
  competenceBelowMinimum: boolean | null;
}

export interface TeacherRetirementPlanningRejectionFirstAnalysisPeriodInterface {
  bondOrigin: string | null;
  period: string | null;
  category: string | null;
  contributionTime: string | null;
  gracePeriod: string | null;
  status: string | null;
  startDate: string | null;
  endDate: string | null;
  competenceBelowTheMinimum: boolean | null;
  contributionAverage: string | null;
  timelineClassification: string | null;
  earningsHistory: TeacherRetirementPlanningRejectionFirstAnalysisEarningsHistoryInterface[];
}

export interface TeacherRetirementPlanningRejectionFirstAnalysisInterface {
  summary: TeacherRetirementPlanningRejectionFirstAnalysisSummaryInterface;
  periods: TeacherRetirementPlanningRejectionFirstAnalysisPeriodInterface[];
}
