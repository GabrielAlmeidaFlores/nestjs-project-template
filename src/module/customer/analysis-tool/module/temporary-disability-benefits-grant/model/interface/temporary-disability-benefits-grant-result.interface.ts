export interface TemporaryDisabilityBenefitsGrantResultGracePeriodAnalysisInterface {
  totalContribution: string;
  minimumGracePeriodRequired: string;
  status: boolean;
}

export interface TemporaryDisabilityBenefitsGrantResultInsuredStatusInterface {
  lastContributionDate: string;
  disabilityStartDate: string;
  gracePeriod: boolean;
  status: boolean;
}

export interface TemporaryDisabilityBenefitsGrantResultDisabilityAnalysisInterface {
  informedCids: string[];
  preliminaryAnalysis: string;
}

export interface TemporaryDisabilityBenefitsGrantResultRetirementRuleInterface {
  ruleName: string;
  fulfilled: boolean;
  retirementDate: string;
  expectedRmi: number;
  causeValue: number;
  detailedAnalysis: string;
}

export interface TemporaryDisabilityBenefitsGrantResultInterface {
  isEligibleForTemporaryDisabilityBenefits: boolean;
  gracePeriodAnalysis: TemporaryDisabilityBenefitsGrantResultGracePeriodAnalysisInterface;
  insuredStatus: TemporaryDisabilityBenefitsGrantResultInsuredStatusInterface;
  disabilityAnalysis: TemporaryDisabilityBenefitsGrantResultDisabilityAnalysisInterface;
  retirementRules: TemporaryDisabilityBenefitsGrantResultRetirementRuleInterface[];
  analysisResult: string;
}
