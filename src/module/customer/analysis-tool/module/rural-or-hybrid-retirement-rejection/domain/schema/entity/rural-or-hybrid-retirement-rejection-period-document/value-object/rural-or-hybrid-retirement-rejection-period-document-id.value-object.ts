import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementRejectionPeriodDocumentId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionPeriodDocumentId.name;
}
