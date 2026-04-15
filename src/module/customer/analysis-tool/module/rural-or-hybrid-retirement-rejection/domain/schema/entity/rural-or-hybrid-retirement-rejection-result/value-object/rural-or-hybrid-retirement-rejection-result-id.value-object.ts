import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementRejectionResultId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionResultId.name;
}
