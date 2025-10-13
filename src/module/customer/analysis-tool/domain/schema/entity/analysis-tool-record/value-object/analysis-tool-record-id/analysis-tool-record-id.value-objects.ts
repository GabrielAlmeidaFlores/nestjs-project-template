import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AnalysisToolRecordId extends Guid {
  protected override readonly _type = AnalysisToolRecordId.name;
}
