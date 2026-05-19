export interface SpecialRetirementRejectionRetirementRuleInterface {
  ruleName: string;
  fulfilled: boolean;
  grantDate: string;
  expectedRmi: number;
  causeValue: number;
  bestRmi: boolean;
  biggestCauseValue: boolean;
  detaildAnalysis: string;
}

export interface SpecialRetirementRejectionCompleteAnalysisInterface {
  retirementRules: SpecialRetirementRejectionRetirementRuleInterface[];
  analysisResult: string;
}
