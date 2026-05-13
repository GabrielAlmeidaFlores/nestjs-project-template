export interface RetirementPermanentDisabilityRevisionFirstAnalysisBenefitAnalysisInterface {
  benefitType: string;
  dib: string;
  initialMonthlyIncome: number;
  updatedMonthlyIncome: number;
  insuredName: string;
}

export interface RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeRequiredInterface {
  withoutPendingIssues: string;
  afterResolvingPendingIssues: string;
  withCollaborators: string;
}

export interface RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeInterface {
  minimumRequired: RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeRequiredInterface;
  description: string;
}

export interface RetirementPermanentDisabilityRevisionFirstAnalysisConcessionLetterBreakdownItemInterface {
  competence: string;
  amount: number;
  reasonNotConsidered: string;
  action: string;
}

export interface RetirementPermanentDisabilityRevisionFirstAnalysisInterface {
  benefitAnalysis: RetirementPermanentDisabilityRevisionFirstAnalysisBenefitAnalysisInterface;
  contributionTime: RetirementPermanentDisabilityRevisionFirstAnalysisContributionTimeInterface;
  concessionLetterBreakdown: RetirementPermanentDisabilityRevisionFirstAnalysisConcessionLetterBreakdownItemInterface[];
}
