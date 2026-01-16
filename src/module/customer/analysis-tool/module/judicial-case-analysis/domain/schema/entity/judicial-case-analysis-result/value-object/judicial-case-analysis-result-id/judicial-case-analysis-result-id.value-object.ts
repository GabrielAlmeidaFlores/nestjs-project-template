import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class JudicialCaseAnalysisResultId extends Guid {
  protected override readonly _type = JudicialCaseAnalysisResultId.name;
}
