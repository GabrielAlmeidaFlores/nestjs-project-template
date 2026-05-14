import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class ElderlyBpcRejectionId extends Guid {
  protected override readonly _type = ElderlyBpcRejectionId.name;
}
