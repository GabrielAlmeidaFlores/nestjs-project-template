import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-job-type.enum';
import type { MaternityPayRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-period-consideration.enum';
import type { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';

export interface MaternityPayRejectionWorkPeriodEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayRejectionWorkPeriodId> {
  bondOrigin?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  pendencyReason?: string | null;
  periodConsideration?: MaternityPayRejectionWorkPeriodPeriodConsiderationEnum | null;
  contributionAverage?: string | null;
  status?: string | null;
  gracePeriod?: string | null;
  jobType?: MaternityPayRejectionWorkPeriodJobTypeEnum | null;
  activityDescription?: string | null;
  maternityPayRejectionId?: MaternityPayRejectionId | null;
}
