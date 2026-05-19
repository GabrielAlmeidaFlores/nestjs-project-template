export interface PermanentIncapacityBenefitTerminatedResultGracePeriodAnalysisInterface {
  totalContribution: string;
  minimumGracePeriodRequired: string;
  status: boolean;
}

export interface PermanentIncapacityBenefitTerminatedResultInsuredStatusInterface {
  lastContributionDate: string;
  disabilityStartDate: string;
  gracePeriod: boolean;
  status: boolean;
}

export interface PermanentIncapacityBenefitTerminatedResultDisabilityAnalysisInterface {
  informedCids: string[];
  medicalDocumentsCount: number;
  preliminaryAnalysis: string;
}

export interface PermanentIncapacityBenefitTerminatedResultRetirementRuleInterface {
  modality: string;
  isFulfilled: boolean;
  retirementDate: string | null;
  estimatedRmi: string | null;
  estimatedCauseValue: string | null;
  detailedAnalysis: string;
}

export interface PermanentIncapacityBenefitTerminatedResultInterface {
  isEligibleForPermanentIncapacityBenefit: boolean;
  gracePeriodAnalysis: PermanentIncapacityBenefitTerminatedResultGracePeriodAnalysisInterface;
  insuredStatus: PermanentIncapacityBenefitTerminatedResultInsuredStatusInterface;
  disabilityAnalysis: PermanentIncapacityBenefitTerminatedResultDisabilityAnalysisInterface;
  retirementRules: PermanentIncapacityBenefitTerminatedResultRetirementRuleInterface[];
  analysisResult: string;
  completeAnalysisDownload: string;
}
