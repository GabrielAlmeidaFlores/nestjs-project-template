export interface TeacherRetirementPlanningTimeAcceleratorAnalysisResultItemInterface {
  timeType: string;
  recognitionInss: string;
  viability: string;
  technicalNote: string | null;
  startDate: string | null;
  endDate: string | null;
  gracePeriod: string | null;
  institution: string | null;
  affectsQualifyingPeriod: boolean;
}

export interface TeacherRetirementPlanningTimeAcceleratorAnalysisResultInterface {
  timeAccelerators: TeacherRetirementPlanningTimeAcceleratorAnalysisResultItemInterface[];
}
