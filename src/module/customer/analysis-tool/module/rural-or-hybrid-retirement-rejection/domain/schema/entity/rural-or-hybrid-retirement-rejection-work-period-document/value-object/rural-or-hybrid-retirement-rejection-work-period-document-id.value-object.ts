import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementRejectionWorkPeriodDocumentId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentId.name;
}
