import type { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import type { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import type { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';

export interface GeneralUrbanRetirementDenialPppAnalysisResultItemInterface {
  startDate: string;
  endDate: string | null;
  category: GeneralUrbanRetirementDenialPeriodCategoryEnum;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  pendencyReason: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum | null;
  typeOfContribution: string | null;
  status: boolean;
  contributionAverage: string | null;
  periodConsideration: GeneralUrbanRetirementDenialPeriodConsiderationEnum | null;
  bondOrigin: string | null;
}

export interface GeneralUrbanRetirementDenialPppAnalysisResultInterface {
  periods: GeneralUrbanRetirementDenialPppAnalysisResultItemInterface[];
}
