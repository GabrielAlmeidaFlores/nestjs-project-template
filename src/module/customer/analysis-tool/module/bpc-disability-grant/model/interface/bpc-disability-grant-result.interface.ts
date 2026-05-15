export interface BpcDisabilityGrantRetirementRuleInterface {
  benefitType: string;
  result: boolean;
  benefitStartDate: string;
  RMIprevista: string;
  detaildAnalysis: string;
}

export interface BpcDisabilityGrantResultInterface {
  isElligibleForDisabilityBpc: boolean;
  totalFamiliarIncome: string;
  perCapitaIncome: string;
  lessThanOneQuarter: boolean;
  lessThanHalfAndAboveOneQuarter: boolean;
  disabilityProven: boolean;
  retirementRules: BpcDisabilityGrantRetirementRuleInterface[];
  analysisResult: string;
  analysisConclusion: string;
}
