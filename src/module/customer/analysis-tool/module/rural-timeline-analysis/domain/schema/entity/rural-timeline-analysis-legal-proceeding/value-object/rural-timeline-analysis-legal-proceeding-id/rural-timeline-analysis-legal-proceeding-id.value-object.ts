import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineAnalysisLegalProceedingId extends Guid {
  protected override readonly _type =
    RuralTimelineAnalysisLegalProceedingId.name;
}
