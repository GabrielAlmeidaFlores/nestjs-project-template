export interface TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemInterface {
  event: string;
  date: string;
  observation: string;
}

export interface TemporaryDisabilityBenefitsGrantFirstAnalysisInterface {
  insuredStatus: boolean;
  gracePeriodStatus: boolean;
  gracePeriods: TemporaryDisabilityBenefitsGrantFirstAnalysisGracePeriodItemInterface[];
  analysisConclusion: string;
  graceExtensionDueToInvoluntaryUnemployment: boolean;
  requestToExtendGracePeriod: boolean;
}
