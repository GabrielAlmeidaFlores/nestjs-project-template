export interface AccidentBenefitRejectionResultRuleInterface {
  ruleName: string;
  fulfilled: boolean;
  retirementDate: string | null;
  expectedRmi: number | null;
  causeValue: number | null;
  detailedAnalysis: string;
}

export interface AccidentBenefitRejectionResultInterface {
  retirementRules: AccidentBenefitRejectionResultRuleInterface[];
  analysisResult: string;
}
