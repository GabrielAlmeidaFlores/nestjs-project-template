export interface DisabilityRetirementPlanningRejectionResultClientDataInterface {
  name: string;
  federalDocument: string;
  lastAffiliationDate?: string;
  birthDate?: string;
  gender: string;
}

export interface DisabilityRetirementPlanningRejectionResultRetirementRuleInterface {
  retirementRuleName: string;
  isEligible: boolean;
  eligibilityAvailableAt?: string;
  expectedMonthlyBenefit: number;
  isBestRmi: boolean;
  isHighestCauseValue: boolean;
  retirementAnalysis: string;
}

export interface DisabilityRetirementPlanningRejectionResultInterface {
  clientData: DisabilityRetirementPlanningRejectionResultClientDataInterface;
  retirementRules: DisabilityRetirementPlanningRejectionResultRetirementRuleInterface[];
  analysisResult: string;
  completeAnalysisDownload: string;
}
