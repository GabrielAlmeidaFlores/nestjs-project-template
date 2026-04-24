import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementRejectionPeriodId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionPeriodId.name;
}
