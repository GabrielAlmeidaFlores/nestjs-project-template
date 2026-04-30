export interface SpecialRetirementRejectionFirstAnalysisLegalFrameworkInterface {
  codeDescription: string;
  description: string;
}

export interface SpecialRetirementRejectionFirstAnalysisTechnicalConclusionInterface {
  recognizedSpecialTime: boolean;
  technicalJustification: string;
  additionalObservation: string;
}

export interface SpecialRetirementRejectionFirstAnalysisHarmfulAgentsInterface {
  frequencyAndIntensityOfExposition: string;
  sourceOfInformation: string;
  identifiedAgents: string;
  effectiveEPI: boolean;
}

export interface SpecialRetirementRejectionFirstAnalysisWorkSpecialPeriodInterface {
  recognizedSpecialTime: boolean;
  companyName: string;
  cnpj: string;
  position: string;
  comprobatoryDocument: string;
  linkedToCniss: boolean;
  containsCnisRemunerationInPeriod: boolean;
  harmfulAgents: SpecialRetirementRejectionFirstAnalysisHarmfulAgentsInterface;
  legalFramework: SpecialRetirementRejectionFirstAnalysisLegalFrameworkInterface[];
  technicalConclusion: SpecialRetirementRejectionFirstAnalysisTechnicalConclusionInterface;
}

export interface SpecialRetirementRejectionFirstAnalysisEarningsHistoryInterface {
  competence: string;
  value: string;
  pendencyType?: string | null;
  collectedAt?: string | null;
  contributionBelowTheMinimun: boolean;
}

export interface SpecialRetirementRejectionFirstAnalysisWorkPeriodInterface {
  bondOrigin: string;
  startDate: string;
  endDate: string;
  category: string;
  pendencyReason: string[];
  periodConsideration: string;
  contributionAverage: string;
  status: string;
  gracePeriod: string;
  activityType: string;
}

export interface SpecialRetirementRejectionFirstAnalysisInterface {
  decisionAnalysis: string;
  specialTimeWithoutResolvingPendencies: string;
  specialTimeResolvingPendencies: string;
  specialTimeWithAccelerators: string;
  commonTimeWithoutResolvingPendencies: string;
  commonTimeResolvingPendencies: string;
  commonTimeWithAccelerators: string;
  totalTimeWithoutResolvingPendencies: string;
  totalTimeResolvingPendencies: string;
  totalTimeWithAccelerators: string;
  specialGracePeriodWithoutResolvingPendencies: string;
  specialGracePeriodResolvingPendencies: string;
  specialGracePeriodWithAccelerators: string;
  commonGracePeriodWithoutResolvingPendencies: string;
  commonGracePeriodResolvingPendencies: string;
  commonGracePeriodWithAccelerators: string;
  totalGracePeriodWithoutResolvingPendencies: string;
  totalGracePeriodResolvingPendencies: string;
  totalGracePeriodWithAccelerators: string;
  workPeriods: SpecialRetirementRejectionFirstAnalysisWorkPeriodInterface[];
}
