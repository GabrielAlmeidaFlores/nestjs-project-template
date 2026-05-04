export interface SpecialRetirementGrantFirstAnalysisAgentInterface {
  type: string;
  intensity?: string | null;
  unit?: string | null;
  habitual?: boolean | null;
  permanence?: boolean | null;
  source?: string | null;
  epiEficaz?: boolean | null;
}

export interface SpecialRetirementGrantFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null;
  remuneration: string | null;
  indicators: string | null;
  paymentDate: string | null;
  competenceBelowTheMinimum: boolean | null;
}

export interface SpecialRetirementGrantFirstAnalysisPeriodInterface {
  id: string;
  employmentRelationshipSource: string | null;
  startDate: string;
  endDate: string | null;
  category: string | null;
  impact: string | null;
  gracePeriod: number | null;
  agents: SpecialRetirementGrantFirstAnalysisAgentInterface[];
  status: 'valid' | 'pending' | 'invalid';
  earningsHistory: SpecialRetirementGrantFirstAnalysisEarningsHistoryItemInterface[];
  observations?: string[] | null;
}

export interface SpecialRetirementGrantFirstAnalysisTimeSummaryInterface {
  withoutResolvingPendencies: string | null;
  resolvingPendencies: string | null;
  withAccelerators: string | null;
}

export interface SpecialRetirementGrantFirstAnalysisGracePeriodSummaryInterface {
  withoutResolvingPendencies: number | null;
  resolvingPendencies: number | null;
  withAccelerators: number | null;
}

export interface SpecialRetirementGrantFirstAnalysisSummaryInterface {
  specialTime: SpecialRetirementGrantFirstAnalysisTimeSummaryInterface;
  commonTime: SpecialRetirementGrantFirstAnalysisTimeSummaryInterface;
  totalTime: SpecialRetirementGrantFirstAnalysisTimeSummaryInterface;
  specialGracePeriod: SpecialRetirementGrantFirstAnalysisGracePeriodSummaryInterface;
  commonGracePeriod: SpecialRetirementGrantFirstAnalysisGracePeriodSummaryInterface;
  totalGracePeriod: SpecialRetirementGrantFirstAnalysisGracePeriodSummaryInterface;
}

export interface SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisItemInterface {
  periodStartDate: string;
  periodEndDate: string | null;
  recognized: boolean;
  justification: string | null;
  legalFramework: string[] | null;
  agents: SpecialRetirementGrantFirstAnalysisAgentInterface[];
  epiEficaz?: boolean | null;
  observations?: string[] | null;
}

export interface SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisInterface {
  items: SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisItemInterface[];
}

export interface SpecialRetirementGrantFirstAnalysisTimelineItemInterface {
  startDate: string;
  endDate: string | null;
  kind: 'special' | 'common' | 'overlap' | 'pendency' | 'gap';
  label: string | null;
}

export interface SpecialRetirementGrantFirstAnalysisIntegratedTimelineInterface {
  items: SpecialRetirementGrantFirstAnalysisTimelineItemInterface[];
}

export interface SpecialRetirementGrantFirstAnalysisInterface {
  summary: SpecialRetirementGrantFirstAnalysisSummaryInterface;
  periods: SpecialRetirementGrantFirstAnalysisPeriodInterface[];
  technicalDiagnosis: SpecialRetirementGrantFirstAnalysisTechnicalDiagnosisInterface;
  integratedTimeline: SpecialRetirementGrantFirstAnalysisIntegratedTimelineInterface;
}
