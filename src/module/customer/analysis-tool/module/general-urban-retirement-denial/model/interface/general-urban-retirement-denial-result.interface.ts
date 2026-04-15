export interface GeneralUrbanRetirementDenialResultClientDataInterface {
  name: string;
  federalDocument: string;
  lastAffiliationDate: string | null;
  birthDate: string | null;
  gender: string;
}

export interface GeneralUrbanRetirementDenialResultRetirementRuleInterface {
  retirementRuleName: string;
  isEligible: boolean;
  eligibilityAvailableAt: string | null;
  expectedMonthlyBenefit: number;
  isBestRmi: boolean;
  isHighestCauseValue: boolean;
  retirementAnalysis: string;
}

export interface GeneralUrbanRetirementDenialResultInterface {
  clientData: GeneralUrbanRetirementDenialResultClientDataInterface;
  retirementRules: GeneralUrbanRetirementDenialResultRetirementRuleInterface[];
  analysisResult: string;
  completeAnalysisDownload: string;
}
