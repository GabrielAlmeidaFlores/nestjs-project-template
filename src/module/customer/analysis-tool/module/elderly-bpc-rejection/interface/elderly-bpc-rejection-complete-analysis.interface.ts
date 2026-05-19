export interface ElderlyBpcRejectionRetirementRuleInterface {
  ruleName: string;
  fulfilled: boolean;
  benefitStartDate: string;
  bestRmi: boolean;
  biggestCauseValue: boolean;
  detaildAnalysis: string;
}

export interface ElderlyBpcRejectionCompleteAnalysisInterface {
  isElligibleForElderlyBpc: boolean;
  totalFamiliarIncome: string;
  perCapitaIncome: string;
  lessThanOneQuarter: boolean;
  ageGreaterThanOrEqualToSixtyFiveYears: boolean;
  retirementRules: ElderlyBpcRejectionRetirementRuleInterface[];
  analysisResult: string;
}
