import type { GeneralUrbanRetirementDenialPeriodCategoryEnum } from './enum/general-urban-retirement-denial-period-category.enum';
import type { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from './enum/general-urban-retirement-denial-period-consideration.enum';
import type { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from './enum/general-urban-retirement-denial-period-pendency-reason.enum';
import type { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from './enum/general-urban-retirement-denial-period-work-type.enum';
import type { GeneralUrbanRetirementDenialPeriodId } from './value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import type { GeneralUrbanRetirementDenialId } from '../general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export interface GeneralUrbanRetirementDenialPeriodEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialPeriodId> {
  bondOrigin?: string | null;
  category?: GeneralUrbanRetirementDenialPeriodCategoryEnum | null;
  activityDescription?: string | null;
  startDate: Date;
  endDate?: Date | null;
  workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;
  impactMonths?: number | null;
  graceMonths?: number | null;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage?: DecimalValue | null;
  pendencyReason?: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum | null;
  periodConsideration?: GeneralUrbanRetirementDenialPeriodConsiderationEnum | null;
  wantsToComplementViaMeuINSS?: boolean | null;
  status: boolean;
  generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;
}
