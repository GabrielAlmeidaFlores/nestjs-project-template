import type { MaternityPayGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-pendency-reason.enum';
import type { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

export interface MaternityPayGrantFirstAnalysisAnalysisSectionInterface {
  isConfirmed: boolean;
  description: string;
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
}

export interface MaternityPayGrantFirstAnalysisInterface {
  insuredQualityAnalysis: MaternityPayGrantFirstAnalysisAnalysisSectionInterface;
  carenciaAnalysis: MaternityPayGrantFirstAnalysisAnalysisSectionInterface;
  benefitEligibilityAnalysis: MaternityPayGrantFirstAnalysisAnalysisSectionInterface;
  periods: MaternityPayGrantFirstAnalysisPeriodInterface[];
}
