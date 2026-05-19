export interface BpcDisabilityDenialApplicableRuleInterface {
  title: string;
  description: string;
  status: string;
}

export interface BpcDisabilityDenialBenefitSummaryInterface {
  benefitType: string;
  result: string;
  dib?: string | null;
  expectedMonthlyBenefit?: number | null;
  detailedAnalysis?: string | null;
}

export interface BpcDisabilityDenialResultInterface {
  analysisResult: string;
  analysisDetailedText: string;
  completeAnalysisDownload: string;
  applicableRules: BpcDisabilityDenialApplicableRuleInterface[];
  benefitSummaries: BpcDisabilityDenialBenefitSummaryInterface[];
}
