export interface BpcDisabilityTerminationApplicableRuleInterface {
  title: string;
  description: string;
  status: string;
}

export interface BpcDisabilityTerminationBenefitSummaryInterface {
  benefitType: string;
  result: string;
  dib?: string | null;
  expectedMonthlyBenefit?: number | null;
  detailedAnalysis?: string | null;
}

export interface BpcDisabilityTerminationResultInterface {
  analysisResult: string;
  analysisDetailedText: string;
  completeAnalysisDownload: string;
  applicableRules: BpcDisabilityTerminationApplicableRuleInterface[];
  benefitSummaries: BpcDisabilityTerminationBenefitSummaryInterface[];
}
