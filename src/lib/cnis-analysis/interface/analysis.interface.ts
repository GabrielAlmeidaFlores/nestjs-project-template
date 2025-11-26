export interface AnalysisServiceInterface {
  type: string;
  eligibility: EligibilityInterface;
  age?: number;
  gender?: string;
  requirements: RequirementsInterface;
  points?: number | null;
  totalContributionYears?: number | null;
  totalContributionYearsAtReforma?: number | null;
  totalCarenciaMonths?: number | null;
  totalContributionMonths?: number | null;
  totalContributionDays?: number | null;
}

interface EligibilityInterface {
  isEligible?: boolean;
  eligibilityDate?: Date | null;
  projectedFulfillmentDate?: Date | null;
}

interface RequirementsInterface {
  requiredAge?: number;
  requiredPoints?: number;
  requiredContributionYears?: number;
  requiredCarenciaMonths?: number;
  meetsAgeRequirement?: boolean;
  meetsContributionRequirement?: boolean;
  meetsCarenciaRequirement?: boolean;
  meetsPointsRequirement?: boolean;
  reachedContributionRequirementDate?: Date | null;
  reachedCarenciaRequirementDate?: Date | null;
  reachedPointsRequirementDate?: Date | null;
  reachedAgeRequirementDate?: Date | null;
}
