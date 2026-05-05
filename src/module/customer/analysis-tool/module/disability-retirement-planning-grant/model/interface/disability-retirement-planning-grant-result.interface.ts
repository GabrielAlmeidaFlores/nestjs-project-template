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

  const parsed = JSON.parse(
    cleaned,
  ) as DisabilityRetirementPlanningGrantResultInterface;

  if (typeof parsed.analysisResult === 'string') {
    parsed.analysisResult = parsed.analysisResult.replace(/\\n/g, '\n');
  }
  if (Array.isArray(parsed.retirementRules)) {
    parsed.retirementRules = parsed.retirementRules.map((rule) => ({
      ...rule,
      retirementAnalysis:
        typeof rule.retirementAnalysis === 'string'
          ? rule.retirementAnalysis.replace(/\\n/g, '\n')
          : rule.retirementAnalysis,
    }));
  }

  return parsed;
}

const enum SanitizerCharCodeEnum {
  CONTROL_CHAR_MAX = 0x20,
  LINE_FEED = 0x0a,
  CARRIAGE_RETURN = 0x0d,
  HORIZONTAL_TAB = 0x09,
  HEX_RADIX = 16,
  UNICODE_PAD_LENGTH = 4,
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

    const codeEnum = code as SanitizerCharCodeEnum;
    if (inString && codeEnum < SanitizerCharCodeEnum.CONTROL_CHAR_MAX) {
      if (codeEnum === SanitizerCharCodeEnum.LINE_FEED) {
        result += '\\n';
      } else if (codeEnum === SanitizerCharCodeEnum.CARRIAGE_RETURN) {
        result += '\\r';
      } else if (codeEnum === SanitizerCharCodeEnum.HORIZONTAL_TAB) {
        result += '\\t';
      } else {
        result +=
          '\\u' +
          code
            .toString(SanitizerCharCodeEnum.HEX_RADIX)
            .padStart(SanitizerCharCodeEnum.UNICODE_PAD_LENGTH, '0');
      }
      continue;
    }

    result += char;
  }

  return result;
}
