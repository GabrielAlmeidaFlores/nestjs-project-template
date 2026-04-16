import type { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import type { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import type { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import type { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';

export interface GeneralUrbanRetirementDenialPppAnalysisResultItemInterface {
  bondOrigin: string | null | undefined;
  category: GeneralUrbanRetirementDenialPeriodCategoryEnum;
  activityDescription: string | null | undefined;
  startDate: string;
  endDate: string | null | undefined;
  workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;
  impactMonths: number | null | undefined;
  graceMonths: number | null | undefined;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage: string | null | undefined;
  pendencyReason:
    | GeneralUrbanRetirementDenialPeriodPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | GeneralUrbanRetirementDenialPeriodConsiderationEnum
    | null
    | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
}

export interface GeneralUrbanRetirementDenialPppAnalysisResultInterface {
  periods: GeneralUrbanRetirementDenialPppAnalysisResultItemInterface[];
}
