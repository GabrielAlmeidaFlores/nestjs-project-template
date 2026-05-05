export interface TeacherRetirementPlanningRejectionRetirementRuleInterface {
  modality: string;
  fulfilled: boolean;
  retirementDate: string | null;
  expectedRmi: number | null;
  estimatedCauseValue: number | null;
  bestRmi: boolean;
  highestCauseValue: boolean;
  detailedAnalysis: string;
}

export interface TeacherRetirementPlanningRejectionResultInterface {
  clientData: {
    name: string | null;
    cpf: string | null;
    birthDate: string | null;
  };
  retirementRules: TeacherRetirementPlanningRejectionRetirementRuleInterface[];
  analysisResult: string;
  completeAnalysisDownload: string;
}
