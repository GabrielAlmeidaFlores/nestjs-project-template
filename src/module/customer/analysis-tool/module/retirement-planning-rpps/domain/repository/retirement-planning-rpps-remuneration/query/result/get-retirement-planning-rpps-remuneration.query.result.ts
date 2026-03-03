import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';

export class GetRetirementPlanningRppsRemunerationQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsRemunerationId;
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: DecimalValue;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsRemunerationQueryResult.name;
}
