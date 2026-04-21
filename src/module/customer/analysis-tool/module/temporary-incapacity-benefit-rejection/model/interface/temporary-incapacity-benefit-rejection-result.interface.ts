export interface TemporaryIncapacityBenefitRejectionResultInterface {
  isEligibleForTemporaryIncapacityBenefit: boolean;
  gracePeriodAnalysis: object;
  insuredStatus: object;
  disabilityAnalysis: object;
  retirementRules: Array<{
    modality: string;
    isFulfilled: boolean;
    retirementDate: string | null;
    estimatedRmi: string | null;
    estimatedCauseValue: string | null;
  }>;
  analysisResult: string;
}
