export interface GeneralUrbanRetirementCompleteAnalysisClientDataInterface {
  name?: string;
  cpfCnpj?: string;
  birthDate?: string;
  gender?: string;
  email?: string;
  phone?: string;
  currentPosition?: string;
  ni?: string;
  lawsuitNumber?: string;
}

export interface GeneralUrbanRetirementCompleteAnalysisRulesSummaryInterface {
  totalAnalyzed?: number;
  eligibleCount?: number;
  nonEligibleCount?: number;
}

export interface GeneralUrbanRetirementCompleteAnalysisRetirementRuleInterface {
  ruleName?: string;
  regime?: string;
  result?: boolean;
  rightDate?: string;
  estimatedRMI?: number;
  bestRMI?: boolean;
  highestLawsuitValue?: boolean;
  detailedRuleAnalysis?: string;
}

export interface GeneralUrbanRetirementCompleteAnalysisTimelineItemInterface {
  startDate?: string;
  endDate?: string;
  activityType?: string;
  type?: string;
  location?: string;
  duration?: string;
}

export interface GeneralUrbanRetirementCompleteAnalysisSpecialTimePeriodInterface {
  label?: string;
  start?: string;
  end?: string;
  recognized?: boolean;
  companyName?: string;
  companyCNPJ?: string;
  role?: string;
  employmentLinkStartDate?: string;
  employmentLinkEndDate?: string;
  employmentLinkSupportingDocument?: string;
  employmentLinkPresentInCNIS?: boolean;
  employmentLinkEarningsInCNIS?: boolean;
  harmfulAgentsExposureFrequency?: Array<{
    agent?: string;
    intensity?: string;
    characteristic?: string;
  }>;
  harmfulAgentsInformationSource?: string[];
  harmfulAgentsIdentifiedAgents?: string[];
  harmfulAgentsEffectivePPE?: boolean;
  legalFrameworkOccupationalCategoryDecree?: string;
  legalFrameworkOccupationalCategoryCode?: string;
  legalFrameworkHarmfulAgentDecree?: string;
  legalFrameworkHarmfulAgentCode?: string;
  legalFrameworkCaseLawOrTechnicalStandardReference?: string;
  legalFrameworkCaseLawOrTechnicalStandardCode?: string;
  technicalConclusionSpecialTimeRecognized?: boolean;
  technicalConclusionJustification?: string;
  additionalNotes?: string;
}

export interface GeneralUrbanRetirementCompleteAnalysisPcdPeriodInterface {
  label?: string;
  start?: string;
  end?: string;
  recognized?: boolean;
  companyName?: string;
  companyCNPJ?: string;
  role?: string;
  employmentLinkStartDate?: string;
  employmentLinkEndDate?: string;
  employmentLinkSupportingDocument?: string;
  employmentLinkPresentInCNIS?: boolean;
  employmentLinkEarningsInCNIS?: boolean;
  disabilityType?: string;
  cidCodes?: string[];
  cifClassification?: string;
  disabilityDegree?: string;
  legalFrameworkByDisabilityType?: string;
  legalFrameworkMainLaw?: string;
  legalFrameworkAssessmentMethodology?: string;
  technicalConclusionPcdTimeRecognized?: boolean;
  technicalConclusionJustification?: string;
  additionalNotes?: string;
}

export interface GeneralUrbanRetirementCompleteAnalysisContributionTimeSummaryInterface {
  totalContributionTime?: string;
  publicServiceContributionTime?: string;
  positionTenureTime?: string;
  currentAge?: string;
  totalCareerTime?: string;
  publicServiceStartDate?: string;
  pcdTime?: string;
  commonTime?: string;
}

export interface GeneralUrbanRetirementCompleteAnalysisInterface {
  clientData?: GeneralUrbanRetirementCompleteAnalysisClientDataInterface;
  rulesSummary?: GeneralUrbanRetirementCompleteAnalysisRulesSummaryInterface;
  retirementRules?: GeneralUrbanRetirementCompleteAnalysisRetirementRuleInterface[];
  timeline?: GeneralUrbanRetirementCompleteAnalysisTimelineItemInterface[];
  specialTimeAnalysis?: GeneralUrbanRetirementCompleteAnalysisSpecialTimePeriodInterface[];
  pcdTimeAnalysis?: GeneralUrbanRetirementCompleteAnalysisPcdPeriodInterface[];
  contributionTimeSummary?: GeneralUrbanRetirementCompleteAnalysisContributionTimeSummaryInterface;
  rppsSummary?: string;
  finalAnalysis?: string;
  completeAnalysisReport?: string;
}

/**
 * Converte a string JSON armazenada no banco no model tipado.
 * Usado no GET e no response do endpoint de criação do result.
 */
export function parseGeneralUrbanRetirementCompleteAnalysis(
  jsonString: string,
): GeneralUrbanRetirementCompleteAnalysisInterface {
  let cleaned = jsonString.trim();
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = JSON.parse(cleaned) as string;
  }
  const parsed = JSON.parse(cleaned) as Record<string, unknown>;
  return parsed as unknown as GeneralUrbanRetirementCompleteAnalysisInterface;
}
