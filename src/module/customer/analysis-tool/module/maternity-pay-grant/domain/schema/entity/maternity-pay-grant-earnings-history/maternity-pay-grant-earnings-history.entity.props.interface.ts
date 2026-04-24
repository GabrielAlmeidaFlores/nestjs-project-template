import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/value-object/maternity-pay-grant-earnings-history-id.value-object';
import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

export interface MaternityPayGrantEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<MaternityPayGrantEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  analysis?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  maternityPayGrantId: MaternityPayGrantId;
  maternityPayGrantPeriodId?: MaternityPayGrantPeriodId | null;
}
