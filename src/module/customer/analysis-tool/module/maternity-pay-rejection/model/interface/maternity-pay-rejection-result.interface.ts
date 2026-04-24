export interface MaternityPayRejectionResultRuleInterface {
  ruleName: string;
  fulfilled: boolean;
  grantDate: string | null;
  expectedRmi: number | null;
  causeValue: number | null;
  detaildAnalysis: string;
}

export interface MaternityPayRejectionResultInterface {
  retirementRules: MaternityPayRejectionResultRuleInterface[];
  isEligibleForMaternityPay: boolean;
  analysisResult: string;
}
