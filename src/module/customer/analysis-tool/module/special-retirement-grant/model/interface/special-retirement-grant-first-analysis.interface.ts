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

export interface SpecialRetirementGrantObservationsFirstAnalysisInterface {
  id: string;
  observation: string;
  createdAt: Date;
  updatedAt: Date;
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
  status: 'valid' | 'pending' | 'invalid' | string;
  earningsHistory: SpecialRetirementGrantFirstAnalysisEarningsHistoryItemInterface[];
  observations?: SpecialRetirementGrantObservationsFirstAnalysisInterface[] | null;
}

export interface SpecialRetirementGrantFirstAnalysisSummaryInterface {
  specialTime: string | null;
  commonTime: string | null;
  specialGracePeriod: number | null;
  commonGracePeriod: number | null;
  totalTime: string | null;
  totalGracePeriod: number | null;
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
  kind: 'special' | 'common' | 'overlap' | 'pendency' | 'gap' | string;
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
