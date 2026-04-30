import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcElderlyCessationResultId extends Guid {
  protected override readonly _type = BpcElderlyCessationResultId.name;
}
