import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementRejectionDocumentId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionDocumentId.name;
}
