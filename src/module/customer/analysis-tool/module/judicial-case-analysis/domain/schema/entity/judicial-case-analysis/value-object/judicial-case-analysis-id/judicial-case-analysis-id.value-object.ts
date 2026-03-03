import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class JudicialCaseAnalysisId extends Guid {
  protected override readonly _type = JudicialCaseAnalysisId.name;
}
