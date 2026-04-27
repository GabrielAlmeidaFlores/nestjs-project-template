import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralOrHybridRetirementAnalysisWorkPeriodDocumentId extends Guid {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentId.name;
}
