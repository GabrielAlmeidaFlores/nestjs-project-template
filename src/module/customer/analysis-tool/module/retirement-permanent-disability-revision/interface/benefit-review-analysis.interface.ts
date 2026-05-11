export interface BenefitReviewAnalysisInterface {
  benefitReviewEligible: string;
  benefitReviewStatusMessage: string;
  benefitReviewSummary: string;
  benefitReviewAlertType: string;
  introductoryText: string;
  informationBoxType: string;
  reviewTheses: ReviewThesisInterface[];
  benefitType: string;
  reviewPossible: string;
  reviewTypes: ReviewTypeInterface[];
  originalRMI: string;
  originalRMA: string;
  revisedRMI: string;
  revisedRMA: string;
  estimatedCaseValue: string;
  detailedAnalysisText: string;
  analysisResultsText: string;
  analysisResultType: string;
  downloadContent: string;
}

export interface ReviewThesisInterface {
  thesisName: string;
  thesisDescription: string;
  thesisApplicable: string;
}

export interface ReviewTypeInterface {
  reviewTypeName: string;
  reviewTypeStatus: string;
}
