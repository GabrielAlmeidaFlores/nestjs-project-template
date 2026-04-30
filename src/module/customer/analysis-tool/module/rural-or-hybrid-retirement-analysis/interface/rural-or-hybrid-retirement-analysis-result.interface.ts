export interface RuralOrHybridRetirementAnalysisRetirementRuleInterface {
  ruleName: string;
  fulfilled: boolean;
  retirementDate: string | null;
  expectedRmi: number | null;
  causeValue: number | null;
  detaildAnalysis: string;
}

export interface RuralOrHybridRetirementAnalysisResultInterface {
  retirementRules: RuralOrHybridRetirementAnalysisRetirementRuleInterface[];
  analysisResult: string;
}
