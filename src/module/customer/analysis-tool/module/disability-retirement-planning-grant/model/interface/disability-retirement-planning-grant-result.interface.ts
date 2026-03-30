export interface DisabilityRetirementPlanningGrantResultRetirementRuleInterface {
  retirementRuleName: string;
  isEligible: boolean;
  eligibilityAvailableAt: string | null;
  expectedMonthlyBenefit: number;
  estimatedProcessValue: number;
  retirementAnalysis: string;
}

export interface DisabilityRetirementPlanningGrantResultSystemRecommendationInterface {
  optionName: string;
  retirementRuleName: string;
  dib: string;
  rmi: number;
  processValue: number;
}

export interface DisabilityRetirementPlanningGrantResultProcessualStrategyInterface {
  suggestionTitle: string;
  suggestionDescription: string;
  bulletPoints: string[] | null;
  successRatePercentageInSimilarCases: number | null;
}

export interface DisabilityRetirementPlanningGrantResultBenefitCompatibilityInterface {
  benefit: string;
  compatibility: boolean;
  observations: string;
}

export interface DisabilityRetirementPlanningGrantResultInterface {
  retirementRules: DisabilityRetirementPlanningGrantResultRetirementRuleInterface[];
  systemRecomendation: DisabilityRetirementPlanningGrantResultSystemRecommendationInterface[];
  processualStrategy: DisabilityRetirementPlanningGrantResultProcessualStrategyInterface[];
  benefitCompatibility: DisabilityRetirementPlanningGrantResultBenefitCompatibilityInterface;
  analysisResult: string;
}

export function parseDisabilityRetirementPlanningGrantCompleteAnalysis(
  jsonString: string,
): DisabilityRetirementPlanningGrantResultInterface {
  let cleaned = jsonString.trim();
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = JSON.parse(cleaned) as string;
  }
  const parsed = JSON.parse(cleaned) as Record<string, unknown>;
  return parsed as unknown as DisabilityRetirementPlanningGrantResultInterface;
}
