import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class JudicialCaseAnalysisLegalProceedingId extends Guid {
  protected override readonly _type =
    JudicialCaseAnalysisLegalProceedingId.name;
}
