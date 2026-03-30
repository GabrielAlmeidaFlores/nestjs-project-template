import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import type { SpecialRetirementGrantPeriodStatusEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-status.enum';
import type { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';

export interface SpecialRetirementGrantPeriodEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantPeriodId> {
  sequencial?: number | null;
  employmentRelationshipSource?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
  status?: SpecialRetirementGrantPeriodStatusEnum | null;
  averageContributionAmount?: DecimalValue | null;
  shouldConsiderPeriod: boolean;
  shouldConsiderLastRemunerationAsExitDate: boolean;
  cnisDocument?: string | null;
  specialRetirementGrant: SpecialRetirementGrantEntity;
}
