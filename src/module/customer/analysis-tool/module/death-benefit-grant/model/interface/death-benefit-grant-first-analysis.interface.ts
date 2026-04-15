import type { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import type { DeathBenefitGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-pendency-reason.enum';

export interface DeathBenefitGrantFirstAnalysisAnalysisSectionInterface {
  isConfirmed: boolean;
  description: string;
}

export interface DeathBenefitGrantFirstAnalysisDependentQualityItemInterface {
  dependentName: string;
  dependencyDegree: string;
  isQualityConfirmed: boolean;
  pensionStartDate: string;
  estimatedPensionDuration: string;
}

export interface DeathBenefitGrantFirstAnalysisRetirementRuleSummaryItemInterface {
  retirementRule: string;
  result: string;
  rightDate: string | null;
  estimatedRmi: string | null;
  isBestRmi: boolean;
  isHighestCauseValue: boolean;
  detailedAnalysisDescription: string;
}

export interface DeathBenefitGrantFirstAnalysisBelowMinimumContributionItemInterface {
  contributionDate: string;
  contributionValue: number | string;
}

export interface DeathBenefitGrantFirstAnalysisEarningsHistoryItemInterface {
  competence: string | null;
  remuneration: string | null;
  indicators: string | null;
  paymentDate: string | null;
  contribution: string | null;
  contributionSalary: string | null;
  analysis: string | null;
  competenceBelowTheMinimum: boolean | null;
}

export interface DeathBenefitGrantFirstAnalysisPeriodInterface {
  name: string;
  startDate: string;
  endDate: string;
  category: DeathBenefitGrantCategoryEnum;
  gracePeriod: number;
  status: boolean;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage?: number | string;
  belowMinimumContributions: DeathBenefitGrantFirstAnalysisBelowMinimumContributionItemInterface[];
  reasonPendency?: DeathBenefitGrantPeriodPendencyReasonEnum;
  bondOrigin?: string | null;
  impact?: string | null;
  complementViaMyInss?: boolean | null;
  earningsHistory: DeathBenefitGrantFirstAnalysisEarningsHistoryItemInterface[];
}

export interface DeathBenefitGrantFirstAnalysisInterface {
  insuredQualityAnalysis: DeathBenefitGrantFirstAnalysisAnalysisSectionInterface;
  scheduledRetirementRightAnalysis: DeathBenefitGrantFirstAnalysisAnalysisSectionInterface;
  disabilityRetirementRightAnalysis: DeathBenefitGrantFirstAnalysisAnalysisSectionInterface;
  dependentQualityAnalysis: DeathBenefitGrantFirstAnalysisDependentQualityItemInterface[];
  retirementRuleSummaries: DeathBenefitGrantFirstAnalysisRetirementRuleSummaryItemInterface[];
  periods: DeathBenefitGrantFirstAnalysisPeriodInterface[];
}
