import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialActivityResultId extends Guid {
  protected override readonly _type = SpecialActivityResultId.name;

  public constructor(value?: string) {
    super(value);
  }
}
