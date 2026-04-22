import type { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import type { DeathBenefitRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-pendency-reason.enum';

export interface DeathBenefitRejectionFirstAnalysisAnalysisSectionInterface {
  isConfirmed: boolean;
  description: string;
}

export interface DeathBenefitRejectionFirstAnalysisDependentQualityItemInterface {
  dependentName: string;
  dependencyDegree: string;
  isQualityConfirmed: boolean;
  pensionStartDate: string;
  estimatedPensionDuration: string;
}

export interface DeathBenefitRejectionFirstAnalysisRetirementRuleSummaryItemInterface {
  retirementRule: string;
  result: string;
  rightDate: string | null;
  estimatedRmi: string | null;
  isBestRmi: boolean;
  isHighestCauseValue: boolean;
  detailedAnalysisDescription: string;
}

export interface DeathBenefitRejectionFirstAnalysisBelowMinimumContributionItemInterface {
  contributionDate: string;
  contributionValue: number | string;
}

export interface DeathBenefitRejectionFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null;
  remuneration: string | null;
  indicators: string | null;
  paymentDate: string | null;
  contribution: string | null;
  contributionSalary: string | null;
  analysis: string | null;
  competenceBelowTheMinimum: boolean | null;
}

export interface DeathBenefitRejectionFirstAnalysisPeriodInterface {
  name: string;
  startDate: string;
  endDate: string;
  category: DeathBenefitRejectionCategoryEnum;
  gracePeriod: number;
  status: boolean;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage?: number | string;
  belowMinimumContributions: DeathBenefitRejectionFirstAnalysisBelowMinimumContributionItemInterface[];
  reasonPendency?: DeathBenefitRejectionPeriodPendencyReasonEnum;
  bondOrigin?: string | null;
  impact?: string | null;
  complementViaMyInss?: boolean | null;
  earningsHistory: DeathBenefitRejectionFirstAnalysisEarningsHistoryItemInterface[];
}

export interface DeathBenefitRejectionFirstAnalysisInterface {
  insuredQualityAnalysis: DeathBenefitRejectionFirstAnalysisAnalysisSectionInterface;
  scheduledRetirementRightAnalysis: DeathBenefitRejectionFirstAnalysisAnalysisSectionInterface;
  disabilityRetirementRightAnalysis: DeathBenefitRejectionFirstAnalysisAnalysisSectionInterface;
  dependentQualityAnalysis: DeathBenefitRejectionFirstAnalysisDependentQualityItemInterface[];
  retirementRuleSummaries: DeathBenefitRejectionFirstAnalysisRetirementRuleSummaryItemInterface[];
  periods: DeathBenefitRejectionFirstAnalysisPeriodInterface[];
}
