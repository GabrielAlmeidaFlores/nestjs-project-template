export interface RuralOrHybridRetirementAnalysisFirstAnalysisWorkPeriodInterface {
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

export interface RuralOrHybridRetirementAnalysisFirstAnalysisPeriodInterface {
  startDate: string | null;
  endDate: string | null;
  workerType: string | null;
  workSchedule: string | null;
  propertyName: string | null;
  productionDestination: string | null;
}

export interface RuralOrHybridRetirementAnalysisFirstAnalysisInterface {
  summary: string | null;
  workPeriods: RuralOrHybridRetirementAnalysisFirstAnalysisWorkPeriodInterface[];
  periods: RuralOrHybridRetirementAnalysisFirstAnalysisPeriodInterface[];
  totalContributionTime: string | null;
  eligibilityConclusion: string | null;
}
