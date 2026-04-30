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

  cleaned = sanitizeJsonControlChars(cleaned);

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

function sanitizeJsonControlChars(json: string): string {
  let result = '';
  let inString = false;
  let escaped = false;

  for (let i = 0; i < json.length; i++) {
    const char = json[i];
    const code = json.charCodeAt(i);

    if (escaped) {
      result += char;
      escaped = false;
      continue;
    }

    if (char === '\\' && inString) {
      result += char;
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      result += char;
      continue;
    }

    if (inString && code < 0x20) {
      if (code === 0x0a) result += '\\n';
      else if (code === 0x0d) result += '\\r';
      else if (code === 0x09) result += '\\t';
      else result += '\\u' + code.toString(16).padStart(4, '0');
      continue;
    }

    result += char;
  }

  return result;
}
