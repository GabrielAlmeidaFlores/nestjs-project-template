import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementAnalysisPeriodMemberDocumentId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberDocumentId.name;
}
