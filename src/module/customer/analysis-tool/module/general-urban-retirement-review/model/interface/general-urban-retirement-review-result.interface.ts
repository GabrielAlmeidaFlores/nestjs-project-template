export interface GeneralUrbanRetirementReviewResultClientDataInterface {
  name: string;
  federalDocument: string;
  lastAffiliationDate: string | null;
  birthDate: string | null;
  gender: string;
}

export interface GeneralUrbanRetirementReviewResultRetirementRuleInterface {
  retirementRuleName: string;
  isEligible: boolean;
  eligibilityAvailableAt: string | null;
  expectedMonthlyBenefit: number;
  isBestRmi: boolean;
  isHighestCauseValue: boolean;
  retirementAnalysis: string;
}

export interface GeneralUrbanRetirementReviewResultInterface {
  clientData: GeneralUrbanRetirementReviewResultClientDataInterface;
  retirementRules: GeneralUrbanRetirementReviewResultRetirementRuleInterface[];
  analysisResult: string;
  completeAnalysisDownload: string;
}
