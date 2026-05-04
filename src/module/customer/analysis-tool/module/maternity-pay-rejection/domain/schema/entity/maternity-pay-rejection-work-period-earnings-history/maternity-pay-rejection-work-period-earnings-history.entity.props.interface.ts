import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import type { MaternityPayRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/value-object/maternity-pay-rejection-work-period-earnings-history-id.value-object';

export interface MaternityPayRejectionWorkPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayRejectionWorkPeriodEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowTheMinimum?: string | null;
  maternityPayRejectionWorkPeriodId?: MaternityPayRejectionWorkPeriodId | null;
}
