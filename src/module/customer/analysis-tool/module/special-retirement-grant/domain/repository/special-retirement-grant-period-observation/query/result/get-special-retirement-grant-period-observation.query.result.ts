import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialRetirementGrantPeriodObservationId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/value-object/special-retirement-grant-period-observation-id/special-retirement-grant-period-observation-id.value-object';

export class GetSpecialRetirementGrantPeriodObservationQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementGrantPeriodObservationId;
  public readonly observation: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodObservationQueryResult.name;
}
