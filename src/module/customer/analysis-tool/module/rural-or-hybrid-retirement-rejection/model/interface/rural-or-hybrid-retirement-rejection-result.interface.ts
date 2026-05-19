export interface RuralOrHybridRetirementRejectionRetirementRuleInterface {
  ruleName: string;
  fulfilled: boolean;
  retirementDate: string | null;
  expectedRmi: number | null;
  causeValue: number | null;
  detaildAnalysis: string;
}

export interface RuralOrHybridRetirementRejectionResultInterface {
  retirementRules: RuralOrHybridRetirementRejectionRetirementRuleInterface[];
  analysisResult: string;
}
