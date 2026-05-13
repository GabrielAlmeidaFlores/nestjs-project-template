import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class ElderlyBpcRejectionResultId extends Guid {
  protected override readonly _type = ElderlyBpcRejectionResultId.name;
}
