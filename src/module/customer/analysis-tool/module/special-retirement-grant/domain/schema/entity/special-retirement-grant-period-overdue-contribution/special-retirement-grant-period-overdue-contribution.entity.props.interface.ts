import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import type { SpecialRetirementGrantPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/value-object/special-retirement-grant-period-overdue-contribution-id/special-retirement-grant-period-overdue-contribution-id.value-object';

export interface SpecialRetirementGrantPeriodOverdueContributionEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantPeriodOverdueContributionId> {
  overdueDate: Date;
  paymentDate: Date | null;
  specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;
}
