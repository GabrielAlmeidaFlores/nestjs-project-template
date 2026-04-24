import type { MaternityPayGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-consideration.enum';
import type { MaternityPayGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-pendency-reason.enum';
import type { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

export interface MaternityPayGrantFirstAnalysisAnalysisSectionInterface {
  isConfirmed: boolean;
  description: string;
  status?: string;
}

export interface MaternityPayGrantFirstAnalysisBelowMinimumContributionItemInterface {
  contributionDate: string;
  contributionValue: number | string;
}

export interface MaternityPayGrantFirstAnalysisPeriodInterface {
  name: string;
  startDate: string;
  endDate: string;
  category: MaternityPayGrantCategoryEnum;
  gracePeriod?: number;
  status: boolean;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage?: number | string;
  belowMinimumContributions: MaternityPayGrantFirstAnalysisBelowMinimumContributionItemInterface[];
  reasonPendency?: MaternityPayGrantPeriodPendencyReasonEnum;
  bondOrigin?: string | null;
  complementViaMyInss?: boolean | null;
  impact?: string | null;
  typeOfContribution?: string | null;
  periodConsideration?: MaternityPayGrantPeriodConsiderationEnum | null;
}

export interface MaternityPayGrantFirstAnalysisRequirementAnalysisInterface {
  status: string;
  eventDate?: string | null;
  requirementDate?: string | null;
  statutoryPeriod?: string | null;
  details?: string | null;
  rationale?: string | null;
}

export interface MaternityPayGrantFirstAnalysisApplicationDeadlineInterface {
  status: string;
  duration?: string | null;
  startDate?: string | null;
  terminationDate?: string | null;
  startLeaveDate?: string | null;
  endLeaveDate?: string | null;
  total?: number | null;
  amountBenefit?: string | null;
  calculationBasis?: string | null;
}

export interface MaternityPayGrantFirstAnalysisInterface {
  insuredQualityAnalysis: MaternityPayGrantFirstAnalysisAnalysisSectionInterface;
  carenciaAnalysis: MaternityPayGrantFirstAnalysisAnalysisSectionInterface;
  requirementAnalysis: MaternityPayGrantFirstAnalysisRequirementAnalysisInterface;
  applicationDeadlineAnalysis: MaternityPayGrantFirstAnalysisApplicationDeadlineInterface;
  benefitEligibilityAnalysis: MaternityPayGrantFirstAnalysisAnalysisSectionInterface;
  periods: MaternityPayGrantFirstAnalysisPeriodInterface[];
  lastContribution?: string | null;
  categoryAtDfg?: string | null;
  employmentBondStatus?: string | null;
}
