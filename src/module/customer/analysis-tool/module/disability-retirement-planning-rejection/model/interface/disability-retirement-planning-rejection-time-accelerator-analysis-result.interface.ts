export interface DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultItemInterface {
  type: string;
  recognitionInss: string;
  recognitionJudicial: string;
  viability: string;
  technicalNote?: string;
  startDate?: string;
  endDate?: string;
  institution?: string;
  affectsQualifyingPeriod: boolean;
}

export interface DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultInterface {
  timeAccelerators: DisabilityRetirementPlanningRejectionTimeAcceleratorAnalysisResultItemInterface[];
}
