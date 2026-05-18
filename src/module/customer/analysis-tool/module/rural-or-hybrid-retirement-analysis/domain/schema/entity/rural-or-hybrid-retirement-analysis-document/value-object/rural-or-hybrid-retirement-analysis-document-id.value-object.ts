import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementAnalysisDocumentId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisDocumentId.name;
}
