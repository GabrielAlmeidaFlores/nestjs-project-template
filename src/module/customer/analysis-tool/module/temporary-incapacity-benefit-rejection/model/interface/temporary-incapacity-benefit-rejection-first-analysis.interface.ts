export interface TemporaryIncapacityBenefitRejectionFirstAnalysisInterface {
  insuredStatus: boolean;
  gracePeriodStatus: string;
  gracePeriods: Array<{
    event: string;
    date: string;
    observation: string;
  }>;
  analysisConclusion: string;
  graceExtensionDueToInvoluntaryUnemployment: boolean;
  requestToExtendGracePeriod: boolean;
  contributionTimeWithoutResolvingPendencies: string;
  contributionTimeResolvingPendencies: string;
  contributionTimeWithAccelerators: string;
}
