export interface TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemDataInterface {
  startDate: string;
  endDate: string;
  activityType: string;
  type: string;
  location: string;
}

export interface TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleDataInterface {
  ruleName: string;
  result?: boolean;
  rightDate?: string;
  estimatedRMI?: number;
  bestRMI: boolean;
  highestLawsuitValue: boolean;
  detailedRuleAnalysis: string;
}

export interface TeacherRetirementPlanningRppsCompleteAnalysisDataInterface {
  timeline: TeacherRetirementPlanningRppsCompleteAnalysisTimelineItemDataInterface[];
  retirementRules: TeacherRetirementPlanningRppsCompleteAnalysisRetirementRuleDataInterface[];
  finalAnalysis: string;
  teacherTime: string;
  commonTime: string;
  totalContributionTime: string;
  publicServiceTime: string;
  positionTenureTime: string;
}
