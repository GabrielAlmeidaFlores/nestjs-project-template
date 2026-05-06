import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import type { SpecialRetirementRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/value-object/special-retirement-rejection-work-period-earnings-history-id.value-object';

export interface SpecialRetirementRejectionWorkPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionWorkPeriodEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: DecimalValue | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: DecimalValue | null;
  contributionSalary?: DecimalValue | null;
  competenceBelowTheMinimum?: boolean | null;
  specialRetirementRejectionWorkPeriodId?: SpecialRetirementRejectionWorkPeriodId | null;
}
