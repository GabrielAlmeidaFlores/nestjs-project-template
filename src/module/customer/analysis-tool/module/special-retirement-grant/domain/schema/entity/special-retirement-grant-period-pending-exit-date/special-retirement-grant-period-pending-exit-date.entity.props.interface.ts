import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import type { SpecialRetirementGrantPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/value-object/special-retirement-grant-period-pending-exit-date-id/special-retirement-grant-period-pending-exit-date-id.value-object';

export interface SpecialRetirementGrantPeriodPendingExitDateEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantPeriodPendingExitDateId> {
  pendingDate: Date;
  pendingAmount: DecimalValue;
  specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;
}
