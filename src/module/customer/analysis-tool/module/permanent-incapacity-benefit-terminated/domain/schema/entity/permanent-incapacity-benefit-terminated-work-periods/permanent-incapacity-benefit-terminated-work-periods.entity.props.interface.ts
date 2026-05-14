import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-pendency-reason.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/enum/permanent-incapacity-benefit-terminated-work-periods-period-consideration.enum';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/value-object/permanent-incapacity-benefit-terminated-work-periods-id.value-object';

export interface PermanentIncapacityBenefitTerminatedWorkPeriodsEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedWorkPeriodsId> {
  bondOrigin?: string | null;
  startDate: Date;
  endDate?: Date | null;
  category?: PermanentIncapacityBenefitTerminatedCategoryEnum | null;
  activityDescription?: string | null;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: PermanentIncapacityBenefitTerminatedWorkPeriodsPendencyReasonEnum | null;
  periodConsideration?: PermanentIncapacityBenefitTerminatedWorkPeriodsPeriodConsiderationEnum | null;
  contributionAverage?: DecimalValue | null;
  impactMonths?: number | null;
  gracePeriod?: number | null;
  isPendency: boolean;
  wantsToComplementViaMeuINSS?: boolean | null;
  status: boolean;
  permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;
}
