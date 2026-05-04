export interface MaternityPayRejectionFirstAnalysisInterface {
  insuredStatusManteined: boolean;
  insuredStatusAnalysisConclusion: string;
  gracePeriod: {
    withinTheGracePeriod: boolean;
    situation: string;
    applicableGracePeriod: string;
    endOfGracePeriod: string;
  };
  benefitInformation: {
    situation: string;
    duration: string;
    startDate: string;
    concessionDate: string;
    startOfTheLeave: string;
    endOfTheLeave: string;
    totalLeaveDuration: string;
    amountBenefit: string;
    calculationBasis: string;
  };
  requirementDeadline: {
    triggeringEventDate: string;
    requirementDate: string;
    statuoryDeadline: string;
    details: string;
    justification: string;
  };
}
