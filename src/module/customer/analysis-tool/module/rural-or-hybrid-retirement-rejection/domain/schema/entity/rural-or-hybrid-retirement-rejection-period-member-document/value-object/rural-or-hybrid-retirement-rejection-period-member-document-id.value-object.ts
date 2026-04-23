import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementRejectionPeriodMemberDocumentId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionPeriodMemberDocumentId.name;
}
