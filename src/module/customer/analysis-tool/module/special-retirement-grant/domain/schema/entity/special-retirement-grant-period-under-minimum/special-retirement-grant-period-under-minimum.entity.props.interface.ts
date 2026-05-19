import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import type { SpecialRetirementGrantPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/value-object/special-retirement-grant-period-under-minimum-id/special-retirement-grant-period-under-minimum-id.value-object';

export interface SpecialRetirementGrantPeriodUnderMinimumEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantPeriodUnderMinimumId> {
  contributionDate: Date;
  contributionAmount: DecimalValue;
  specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;
}
