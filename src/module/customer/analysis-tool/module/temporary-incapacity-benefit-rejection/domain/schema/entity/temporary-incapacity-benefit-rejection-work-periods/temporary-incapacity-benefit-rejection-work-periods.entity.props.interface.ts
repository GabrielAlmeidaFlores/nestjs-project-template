import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-pendency-reason.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/enum/temporary-incapacity-benefit-rejection-work-periods-period-consideration.enum';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/value-object/temporary-incapacity-benefit-rejection-work-periods-id.value-object';

export interface TemporaryIncapacityBenefitRejectionWorkPeriodsEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionWorkPeriodsId> {
  bondOrigin?: string | null;
  startDate: Date;
  endDate?: Date | null;
  category?: TemporaryIncapacityBenefitRejectionCategoryEnum | null;
  activityDescription?: string | null;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: TemporaryIncapacityBenefitRejectionWorkPeriodsPendencyReasonEnum | null;
  periodConsideration?: TemporaryIncapacityBenefitRejectionWorkPeriodsPeriodConsiderationEnum | null;
  contributionAverage?: DecimalValue | null;
  impactMonths?: number | null;
  gracePeriod?: number | null;
  isPendency: boolean;
  wantsToComplementViaMeuINSS?: boolean | null;
  status: boolean;
  temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;
}
