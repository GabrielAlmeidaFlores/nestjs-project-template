export interface TemporaryDisabilityBenefitsTerminatedResultGracePeriodAnalysisInterface {
  totalContribution: string;
  minimumGracePeriodRequired: string;
  status: boolean;
}

export interface TemporaryDisabilityBenefitsTerminatedResultInsuredStatusInterface {
  lastContributionDate: string;
  disabilityStartDate: string;
  gracePeriod: boolean;
  status: boolean;
}

export interface TemporaryDisabilityBenefitsTerminatedResultDisabilityAnalysisInterface {
  informedCids: string[];
  medicalDocumentsCount: number;
  preliminaryAnalysis: string;
}

export interface TemporaryDisabilityBenefitsTerminatedResultRetirementRuleInterface {
  modality: string;
  isFulfilled: boolean;
  retirementDate: string | null;
  estimatedRmi: string | null;
  estimatedCauseValue: string | null;
  detailedAnalysis: string;
}

export interface TemporaryDisabilityBenefitsTerminatedResultInterface {
  isEligibleForTemporaryIncapacityBenefit: boolean;
  gracePeriodAnalysis: TemporaryDisabilityBenefitsTerminatedResultGracePeriodAnalysisInterface;
  insuredStatus: TemporaryDisabilityBenefitsTerminatedResultInsuredStatusInterface;
  disabilityAnalysis: TemporaryDisabilityBenefitsTerminatedResultDisabilityAnalysisInterface;
  retirementRules: TemporaryDisabilityBenefitsTerminatedResultRetirementRuleInterface[];
  analysisResult: string;
  completeAnalysisDownload: string;
}
