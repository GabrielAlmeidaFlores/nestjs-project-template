import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CnisFastAnalysisId extends Guid {
  protected override readonly _type = CnisFastAnalysisId.name;
}
