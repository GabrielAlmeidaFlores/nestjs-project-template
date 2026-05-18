import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcElderlyAnalysisId extends Guid {
  protected override readonly _type = BpcElderlyAnalysisId.name;
}
