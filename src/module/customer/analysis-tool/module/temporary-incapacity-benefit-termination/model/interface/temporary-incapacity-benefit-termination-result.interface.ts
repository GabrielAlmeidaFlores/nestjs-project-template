export interface TemporaryIncapacityBenefitTerminationResultGracePeriodAnalysisInterface {
  totalContribution: string;
  minimumGracePeriodRequired: string;
  status: boolean;
}

export interface TemporaryIncapacityBenefitTerminationResultInsuredStatusInterface {
  lastContributionDate: string;
  disabilityStartDate: string;
  gracePeriod: boolean;
  status: boolean;
}

export interface TemporaryIncapacityBenefitTerminationResultDisabilityAnalysisInterface {
  informedCids: string[];
  medicalDocumentsCount: number;
  preliminaryAnalysis: string;
}

export interface TemporaryIncapacityBenefitTerminationResultRetirementRuleInterface {
  modality: string;
  isFulfilled: boolean;
  retirementDate: string | null;
  estimatedRmi: string | null;
  estimatedCauseValue: string | null;
  detailedAnalysis: string;
}

export interface TemporaryIncapacityBenefitTerminationResultInterface {
  isEligibleForTemporaryIncapacityBenefit: boolean;
  gracePeriodAnalysis: TemporaryIncapacityBenefitTerminationResultGracePeriodAnalysisInterface;
  insuredStatus: TemporaryIncapacityBenefitTerminationResultInsuredStatusInterface;
  disabilityAnalysis: TemporaryIncapacityBenefitTerminationResultDisabilityAnalysisInterface;
  retirementRules: TemporaryIncapacityBenefitTerminationResultRetirementRuleInterface[];
  analysisResult: string;
  completeAnalysisDownload: string;
}
