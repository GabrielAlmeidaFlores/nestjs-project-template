export interface TemporaryIncapacityBenefitRejectionResultGracePeriodAnalysisInterface {
  totalContribution: string;
  minimumGracePeriodRequired: string;
  status: boolean;
}

export interface TemporaryIncapacityBenefitRejectionResultInsuredStatusInterface {
  lastContributionDate: string;
  disabilityStartDate: string;
  gracePeriod: boolean;
  status: boolean;
}

export interface TemporaryIncapacityBenefitRejectionResultDisabilityAnalysisInterface {
  informedCids: string[];
  medicalDocumentsCount: number;
  preliminaryAnalysis: string;
}

export interface TemporaryIncapacityBenefitRejectionResultRetirementRuleInterface {
  modality: string;
  isFulfilled: boolean;
  retirementDate: string | null;
  estimatedRmi: string | null;
  estimatedCauseValue: string | null;
  detailedAnalysis: string;
}

export interface TemporaryIncapacityBenefitRejectionResultInterface {
  isEligibleForTemporaryIncapacityBenefit: boolean;
  gracePeriodAnalysis: TemporaryIncapacityBenefitRejectionResultGracePeriodAnalysisInterface;
  insuredStatus: TemporaryIncapacityBenefitRejectionResultInsuredStatusInterface;
  disabilityAnalysis: TemporaryIncapacityBenefitRejectionResultDisabilityAnalysisInterface;
  retirementRules: TemporaryIncapacityBenefitRejectionResultRetirementRuleInterface[];
  analysisResult: string;
  completeAnalysisDownload: string;
}
