export interface TeacherRetirementPlanningCompleteAnalysisTimelineItemDataInterface {
  startDate: string;
  endDate: string;
  activityType: string;
  type: string;
  location: string;
}

export interface TeacherRetirementPlanningCompleteAnalysisRetirementRuleDataInterface {
  ruleName: string;
  result?: boolean;
  rightDate?: string;
  estimatedRMI?: number;
  bestRMI: boolean;
  highestLawsuitValue: boolean;
  detailedRuleAnalysis: string;
}

export interface TeacherRetirementPlanningCompleteAnalysisDataInterface {
  timeline: TeacherRetirementPlanningCompleteAnalysisTimelineItemDataInterface[];
  retirementRules: TeacherRetirementPlanningCompleteAnalysisRetirementRuleDataInterface[];
  finalAnalysis: string;
  teacherTime: string;
  commonTime: string;
  totalContributionTime: string;
  publicServiceTime: string;
  positionTenureTime: string;
}
