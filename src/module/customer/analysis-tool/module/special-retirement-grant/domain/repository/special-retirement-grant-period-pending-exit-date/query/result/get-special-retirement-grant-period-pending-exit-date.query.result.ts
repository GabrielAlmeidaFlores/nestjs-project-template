import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SpecialRetirementGrantPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/value-object/special-retirement-grant-period-pending-exit-date-id/special-retirement-grant-period-pending-exit-date-id.value-object';

export class GetSpecialRetirementGrantPeriodPendingExitDateQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementGrantPeriodPendingExitDateId;
  public readonly pendingDate: Date;
  public readonly pendingAmount: DecimalValue;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodPendingExitDateQueryResult.name;
}
