import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import type { SpecialRetirementGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/value-object/special-retirement-grant-earnings-history-id/special-retirement-grant-earnings-history-id.value-object';
import type { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';

export interface SpecialRetirementGrantEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  competenceBelowTheMinimum?: boolean | null;
  specialRetirementGrant: SpecialRetirementGrantEntity;
  specialRetirementGrantPeriod: SpecialRetirementGrantPeriodEntity;
}
