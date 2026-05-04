export interface BpcElderlyCessationApplicableRuleInterface {
  title: string;
  description: string;
  status: string;
}

export interface BpcElderlyCessationBenefitSummaryInterface {
  benefitType: string;
  result: string;
  dib?: string | null;
  expectedMonthlyBenefit?: number | null;
  detailedAnalysis?: string | null;
}

export interface BpcElderlyCessationResultInterface {
  analysisResult: string;
  analysisDetailedText: string;
  completeAnalysisDownload: string;
  applicableRules: BpcElderlyCessationApplicableRuleInterface[];
  benefitSummaries: BpcElderlyCessationBenefitSummaryInterface[];
  diagnosis: string;
  totalHouseholdIncome?: number | null;
  perCapitaIncome?: number | null;
  legalRequirementsMet: string;
  perCapitaIncomeBelowQuarterMinimumWage: string;
  ageEqualOrAbove65Years: string;
}
