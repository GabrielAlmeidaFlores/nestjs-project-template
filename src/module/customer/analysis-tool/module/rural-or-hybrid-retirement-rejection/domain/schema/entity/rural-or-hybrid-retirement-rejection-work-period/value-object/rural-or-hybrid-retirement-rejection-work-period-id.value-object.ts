import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementRejectionWorkPeriodId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodId.name;
}
