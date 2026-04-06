import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialRetirementGrantPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/value-object/special-retirement-grant-period-under-minimum-id/special-retirement-grant-period-under-minimum-id.value-object';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetSpecialRetirementGrantPeriodUnderMinimumQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementGrantPeriodUnderMinimumId;
  public readonly contributionDate: Date;
  public readonly contributionAmount: DecimalValue;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodUnderMinimumQueryResult.name;
}
