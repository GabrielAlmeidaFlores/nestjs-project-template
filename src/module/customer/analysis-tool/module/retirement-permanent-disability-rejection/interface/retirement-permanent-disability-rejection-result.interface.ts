export interface RetirementPermanentDisabilityRejectionResultRetirementRuleInterface {
  retirementRuleName: string;
  isEligible: boolean;
  eligibilityAvailableAt?: string;
  expectedMonthlyBenefit: number;
  isBestRmi: boolean;
  isHighestCauseValue: boolean;
  retirementAnalysis: string;
}

export interface RetirementPermanentDisabilityRejectionResultInterface {
  retirementRules: RetirementPermanentDisabilityRejectionResultRetirementRuleInterface[];
  analysisResult: string;
  completeAnalysisDownload: string;
  simplifiedAnalysis: string;
}
