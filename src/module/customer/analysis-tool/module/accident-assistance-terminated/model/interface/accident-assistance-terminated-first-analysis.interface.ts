export interface AccidentAssistanceTerminatedFirstAnalysisQualitySecurityInterface {
  status: 'MAINTAINED' | 'NOT_MAINTAINED';
  description: string;
}

export interface AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeInterface {
  existsSequelae: string;
  sequelaeCompatibility: string;
  partialWorkCapacityMaintenance: string;
  description: string;
}

export interface AccidentAssistanceTerminatedFirstAnalysisInterface {
  qualitySecurity: AccidentAssistanceTerminatedFirstAnalysisQualitySecurityInterface;
  assessmentSequelae: AccidentAssistanceTerminatedFirstAnalysisAssessmentSequelaeInterface;
}
