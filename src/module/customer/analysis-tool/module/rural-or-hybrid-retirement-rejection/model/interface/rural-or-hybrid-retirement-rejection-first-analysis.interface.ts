export interface RuralOrHybridRetirementRejectionFirstAnalysisWorkPeriodInterface {
  bondOrigin: string | null;
  startDate: string | null;
  endDate: string | null;
  category: string | null;
  competenceBelowTheMinimum: boolean | null;
  pendencyReason: string | null;
  periodConsideration: string | null;
  contributionAverage: string | null;
  status: string | null;
  gracePeriod: string | null;
}

export interface RuralOrHybridRetirementRejectionFirstAnalysisPeriodInterface {
  startDate: string | null;
  endDate: string | null;
  workerType: string | null;
  workSchedule: string | null;
  propertyName: string | null;
  productionDestination: string | null;
}

export interface RuralOrHybridRetirementRejectionFirstAnalysisInterface {
  summary: string | null;
  workPeriods: RuralOrHybridRetirementRejectionFirstAnalysisWorkPeriodInterface[];
  periods: RuralOrHybridRetirementRejectionFirstAnalysisPeriodInterface[];
  totalContributionTime: string | null;
  eligibilityConclusion: string | null;
}
