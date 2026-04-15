import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementRejectionId extends Guid {
  protected override readonly _type = RuralOrHybridRetirementRejectionId.name;
}
