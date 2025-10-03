import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CnisFastAnalysisClientId extends Guid {
  protected override readonly _type = CnisFastAnalysisClientId.name;
}
