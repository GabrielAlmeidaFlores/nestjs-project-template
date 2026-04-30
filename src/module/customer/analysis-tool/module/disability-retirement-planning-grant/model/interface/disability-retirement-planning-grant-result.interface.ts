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

export interface DisabilityRetirementPlanningGrantResultPeriodEarningsHistoryInterface {
  competence: string | null;
  remuneration: string | null;
  indicators: string | null;
  paymentDate: string | null;
  contribution: string | null;
  contributionSalary: string | null;
  analysis: string | null;
  competenceBelowTheMinimum: boolean | null;
}

export interface DisabilityRetirementPlanningGrantResultPeriodInterface {
  periodId: string;
  earningsHistory: DisabilityRetirementPlanningGrantResultPeriodEarningsHistoryInterface[];
}

export interface DisabilityRetirementPlanningGrantResultInterface {
  retirementRules: DisabilityRetirementPlanningGrantResultRetirementRuleInterface[];
  systemRecomendation: DisabilityRetirementPlanningGrantResultSystemRecommendationInterface[];
  processualStrategy: DisabilityRetirementPlanningGrantResultProcessualStrategyInterface[];
  benefitCompatibility: DisabilityRetirementPlanningGrantResultBenefitCompatibilityInterface;
  analysisResult: string;
  periods?: DisabilityRetirementPlanningGrantResultPeriodInterface[];
}

export function parseDisabilityRetirementPlanningGrantCompleteAnalysis(
  jsonString: string,
): DisabilityRetirementPlanningGrantResultInterface {
  let cleaned = jsonString.trim();
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = JSON.parse(cleaned) as string;
  }
  const parsed = JSON.parse(cleaned) as DisabilityRetirementPlanningGrantResultInterface;

  if (typeof parsed.analysisResult === 'string') {
    parsed.analysisResult = parsed.analysisResult.replace(/\\n/g, '\n');
  }
  if (Array.isArray(parsed.retirementRules)) {
    parsed.retirementRules = parsed.retirementRules.map((rule) => ({
      ...rule,
      retirementAnalysis: typeof rule.retirementAnalysis === 'string'
        ? rule.retirementAnalysis.replace(/\\n/g, '\n')
        : rule.retirementAnalysis,
    }));
  }

  return parsed;
}
