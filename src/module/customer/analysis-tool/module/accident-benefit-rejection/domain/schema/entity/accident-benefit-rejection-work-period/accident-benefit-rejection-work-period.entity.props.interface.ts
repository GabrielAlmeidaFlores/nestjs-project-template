import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import type { AccidentBenefitRejectionWorkPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-consideration.enum';
import type { AccidentBenefitRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-job-type.enum';
import type { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';

export interface AccidentBenefitRejectionWorkPeriodEntityPropsInterface extends BaseEntityPropsInterface<AccidentBenefitRejectionWorkPeriodId> {
  bondOrigin?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  pendencyReason?: string | null;
  periodConsideration?: AccidentBenefitRejectionWorkPeriodConsiderationEnum | null;
  contributionAverage?: string | null;
  status?: string | null;
  gracePeriod?: string | null;
  jobType?: AccidentBenefitRejectionWorkPeriodJobTypeEnum | null;
  activityDescription?: string | null;
  accidentBenefitRejectionId?: AccidentBenefitRejectionId | null;
}
