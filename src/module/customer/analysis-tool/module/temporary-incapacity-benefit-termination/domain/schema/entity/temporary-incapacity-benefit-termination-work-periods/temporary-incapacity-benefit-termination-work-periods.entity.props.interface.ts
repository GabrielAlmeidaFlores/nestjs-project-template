import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TemporaryIncapacityBenefitTerminationCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/enum/temporary-incapacity-benefit-termination-category.enum';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-pendency-reason.enum';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/enum/temporary-incapacity-benefit-termination-work-periods-period-consideration.enum';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/value-object/temporary-incapacity-benefit-termination-work-periods-id.value-object';

export interface TemporaryIncapacityBenefitTerminationWorkPeriodsEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationWorkPeriodsId> {
  bondOrigin?: string | null;
  startDate: Date;
  endDate?: Date | null;
  category?: TemporaryIncapacityBenefitTerminationCategoryEnum | null;
  activityDescription?: string | null;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: TemporaryIncapacityBenefitTerminationWorkPeriodsPendencyReasonEnum | null;
  periodConsideration?: TemporaryIncapacityBenefitTerminationWorkPeriodsPeriodConsiderationEnum | null;
  contributionAverage?: DecimalValue | null;
  impactMonths?: number | null;
  gracePeriod?: number | null;
  isPendency: boolean;
  wantsToComplementViaMeuINSS?: boolean | null;
  status: boolean;
  temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;
}
